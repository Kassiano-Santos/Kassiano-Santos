import React, {useEffect, useState} from 'react';
import styles from './CreateAppointment.module.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { useDateFormatter } from '../../hooks/useDateFormatter';
import BackDashboard from '../../components/BackDashboard';

const CreateAppointment = () => {
  const [formData, setFormData] = useState({
    id_barber: '',
    id_specialties: ''
  });

  const { 
    dateValue, 
    handleDateChange, 
    formatDateForBackend 
  } = useDateFormatter();
  
  const [specialties, setSpecialties] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [availableBarbers, setAvailableBarbers] = useState([]);
  const [success, setSuccess] = useState(''); 

  const [occupiedSlots, setOccupiedSlots] = useState([]);

  const [error,setError] = useState();
  const[loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const { createAppointments, user } = useAuth();
  const navigate = useNavigate();

  //busca as especialidades
  useEffect(()=>{
    fetchSpecialties();
  },[]);

  //busca os barbeiros de acordo com a especialidade selecionada
  useEffect(()=>{
    if(formData.id_specialties){
      fetchBarbersBySpecialites(formData.id_specialties);
    } else {
      setAvailableBarbers([]);
      setFormData(prev => ({...prev, id_barber: ''}))
    }
  },[formData.id_specialties]);

  useEffect(()=>{
    if(formData.id_barber){
      fetchOccupiedSlots(formData.id_barber);
    } else {
      setOccupiedSlots([]);
    }
  },[formData.id_barber])


  const fetchSpecialties = async()=>{
    try {
      const response = await fetch('http://localhost:3000/specialties');
      const data = await response.json();
      setSpecialties(data);
    } catch (error) {
      setError("Erro ao carregar especialidades. " + error)
    }
  }

  const fetchBarbersBySpecialites = async(id_specialties)=> {
    setFetching(true);
    try {
      const response = await fetch(
        `http://localhost:3000/barbers?id_specialties=${id_specialties}`
      );
      const data = await response.json();
      setAvailableBarbers(data);
    } catch (error) {
      setError("Erro ao carregar barbeiros. " + error.message);
    } finally {
      setFetching(false);
    }
  };
  const fetchOccupiedSlots = async (id_barber) => {
    setFetching(true);
    try {
      const response = await fetch(
        `http://localhost:3000/appointments/occupied?id_barber=${id_barber}`
      )
      const data = await response.json();

      setOccupiedSlots(data);
    } catch (error) {
    setError('Erro ao carregar horários ocupados');

    } finally {
    setFetching(false);
  }
  }

  const handleChange = (e)=>{
    const newValue = e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: newValue
    })
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccess('');

    if (!user || !user.id_user) {
      setError('Usuário não autenticado. Faça login novamente.');
      setLoading(false);
      return;
    }

    try {
      // Converter a data para o formato do backend
    const backendDate = formatDateForBackend(formData.appoint_date);

    if (!backendDate) {
      setError('Por favor, preencha a data e hora no formato correto');
      setLoading(false);
      return;
    }
      //Converte de datetime para ISO
      const appointmentData = {
        id_user: user.id_user,
        id_barber: formData.id_barber,
        id_specialties: formData.id_specialties,
        appoint_date: backendDate,
        appoint_status: 'scheduled'
      };

      const result = await createAppointments(appointmentData);

      if(result.success){
        setSuccess('Agendamento criado com sucesso!');

        setFormData({
          id_barber: '',
          id_specialties: '',
          appoint_date: ''
        });
      
        setAvailableBarbers([]);
        setOccupiedSlots([]);

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setError(result.error);
      }
    } catch (error) {
       setError('Erro ao criar agendamento: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <header>
        <div className={styles.title}>
          <BackDashboard className={styles.backBtn}/>
          <h2>Agendar Horário</h2>
        </div>
      </header>
      {/* MENSAGEM DE SUCESSO */}
      {success && (
        <div className={styles.success}>
          {success}
        </div>
      )}
      {/* MENSAGEM DE ERRO */}
      {error && <div className='error'>{error}</div>}
     
      <div className={styles.box}>
        <form onSubmit={handleSubmit}>

          {/* ESPECIALIDADE */}
          <div className={styles.formRow}>
            <label className={styles.formLabel}>
              Especialidade: 
              <select 
                className={styles.formSelect}
                name="id_specialties"
                value={formData.id_specialties}
                onChange={handleChange}
                required
              >
                <option value="">Selecione a especialidade</option>
                {specialties.map((specialty)=>(
                  <option 
                    key = {specialty.id_specialties} 
                    value={specialty.id_specialties}
                  >
                    {specialty.name_specialties}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* BARBEIROS */}
          {formData.id_specialties && (
            <div className={styles.formRow}>
              <label className={styles.formLabel}>
                Barbeiros:
                <select 
                  className={styles.formSelect}
                  name="id_barber"
                  value={formData.id_barber}
                  onChange={handleChange}
                  required
                  disabled={fetching}
                >
                  <option>Selecione um barbeiro</option>
                  {availableBarbers.map((barber)=>(
                    <option 
                      key={barber.id_barber} 
                      value={barber.id_barber}
                    >
                      {barber.name_barbers}
                    </option>
                  ))}
                </select>
                {fetching && <span>Carregando barbeiros...</span>}
              </label>
            </div>
          )}

          {/* HORÁRIO */}
          {formData.id_barber && (
            <div>
              {fetching && <span>Carregando horários...</span>}

              {occupiedSlots.length > 0 && (
                <div className={styles.occupiedSlots}>
                  <div>
                    <p>Horários já reservados para esse barbeiro: </p>
                    <ul>
                      {occupiedSlots.map((slot, index) => (
                        <li key={slot}>
                          {new Date(slot).toLocaleString('pt-BR')}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className={styles.formRow}>
                <label className={styles.formLabel}>
                  Horário Desejado:
                  <input 
                    type="text"
                    name = "appoint_date"
                    value={dateValue}
                    onChange={handleDateChange}
                    className={styles.formInput}
                    required
                    disabled = {fetching}
                    maxLength={16}
                    placeholder="DD/MM/AAAA HH:MM"
                  />
                </label>
              </div>
              <small className={styles.small}>
                Formato: DD/MM/AAAA HH:MM (ex: 07/10/2025 14:30)
              </small>

              {formData.appoint_date && formData.appoint_date.length === 16 && (
                <small className={styles.dateSmall}>
                  Será agendado para: {formatDateForBackend(formData.appoint_date)}
                </small>
              )}
            </div>
          )}
          <button 
            type='submit'
            disabled= {loading || !dateValue}
            className= {styles.submitBtn}
          >
            {loading ? 'Agendando' : 'Agendar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAppointment
