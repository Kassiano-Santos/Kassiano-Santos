import styles from './CreateBarbers.module.css';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDateFormatter } from '../../hooks/useDateFormatter';
import { useFetchSpecialties } from '../../hooks/useFetchSpecialties';
import BackDashboard from '../../components/BackDashboard';

const CreateBarbers = () => {
  const [barbers, setBarbers] = useState('');
  const [ageBarber, setAgeBarber] = useState('');
  
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [specialtyName, setSpecialtyName] = useState('');

  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const {user, createBarbers} = useAuth();

  const handleAgeChange = (e)=> {
    const value = e.target.value;

    // Remove qualquer caractere que não seja número
    const numericValue = value.replace(/[^0-9]/g, '');

    setAgeBarber(numericValue);
  }

  const { 
    dateValue, 
    handleDateChange, 
    formatDateForBackend,
    clearDate 
  } = useDateFormatter();

  const { 
    specialtyList, 
    loading: loadingSpecialties, 
    error: specialtiesError 
  } = useFetchSpecialties();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const ageNumber = parseInt(ageBarber, 10);

      const backEndDate = formatDateForBackend(dateValue);

      if (!backEndDate) {
        setError('Por favor, preencha a data no formato correto (DD/MM/AAAA HH:MM)');
        setLoading(false);
        return;
      }

      if (!user || !user.id_user) {
        setError('Usuário não autenticado. Faça login novamente.');
        setLoading(false);
        return;
      }

      const createDataBarbers = {
        name_barbers: barbers,
        age_barber: ageNumber, 
        hire_date: backEndDate
      };

      const response = await createBarbers(createDataBarbers);

      if(response.success){
        setSuccess("Barbeiro com sucesso.");
        setSpecialtyName(''); 
        setSelectedSpecialty(''); 
        setBarbers('');
        setAgeBarber('');
        clearDate();
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError('Erro ao criar barbeiro: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
          <BackDashboard className={styles.backBtn}/>
        <div className={styles.title}>
          <h1>Cadastro de Barbeiros</h1>
        </div>
      </header>
      {success && (
        <div className={styles.success}>
          {success}
        </div>
      )}
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className={styles.box}>
          <div className={styles.formRow}>
            <label className={styles.formLabel}>
              Barbeiro:
              <input 
                type="text"
                required
                value={barbers}
                placeholder="Digite o nome do barbeiro"
                className={styles.formInput}
                onChange={(e)=> setBarbers(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.formRow}>
            <label className={styles.formLabel}>
              Idade:
              <input 
                type="text"
                value={ageBarber}
                placeholder="Digite a idade do barbeiro"
                className={styles.formInput}
                onChange={handleAgeChange}
                maxLength={2}
                required
              />
            </label>
          </div>

          <div className={styles.formRow}>
            <label className={styles.formLabel}>
              Especialidade:
              <select 
                className={styles.formSelect}
                onChange={(e)=> setSelectedSpecialty(e.target.value)}
                name="id_specialties"
                value={selectedSpecialty}
                required
              >
                <option>Selecione uma especialidade</option>
                {specialtyList.map((specialty)=>(
                  <option
                    key={specialty.id_specialties}
                    value={specialty.id_specialties}
                  >
                    {specialty.name_specialties}
                  </option>
                ))}
              </select>
              
            </label>
          </div>

          <div className={styles.formRow}>
            <label className={styles.formLabel}>
              Data de Contratação:
              <input 
                type="text"
                className={styles.formInput}
                value={dateValue}
                onChange={handleDateChange}
                maxLength={16}
                placeholder="DD/MM/AAAA HH:MM"
                required
              />
            </label>
          </div>
            <small className={styles.small}>
              Formato: DD/MM/AAAA HH:MM (ex: 07/10/2025 14:30)
            </small>
          <button 
            type = "submit" 
            disabled = {loading || !barbers || !ageBarber || !selectedSpecialty || !dateValue}
            className={styles.submitBtn}
          >
            {loading ? 'Criando...' : 'Criar'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateBarbers
