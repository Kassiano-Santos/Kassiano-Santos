import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import styles from '../dashboardPage/Dashboard.module.css'
import { useDateFormatter } from '../../hooks/useDateFormatter';

const Dashboard = () => {
  const {getAppointments, user, logout, deleteAppoint} = useAuth();
  const navigate = useNavigate();
  
  const [error, setError] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const { formatDateForBackend } = useDateFormatter();

  useEffect(()=> {
    fetchAppointments();
  },[]);

  const fetchAppointments= async()=>{
    setLoading(true);
    setError('');

    try {
      const result = await getAppointments(appointments.id_user);

      if(result.success){
        setAppointments(result.appointments || []);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Erro ao carregar agendamentos')
    } finally {
      setLoading(false);
    }
  }

  if(loading){
    return <div>Carregando apontamentos...</div>
  }

  const handleLogout = async ()=> {
    try {
      logout();
      navigate("/");
    }
    catch (error) {
      setError("Erro inesperado: " + error);
    }
  }

  const handleCreateAppointment = ()=> {
    navigate('/createappointment');
  };

  const handleCreateSpecialties = ()=> {
     navigate('/createaspecialties');
  };

  const handleCancelAppointment = async(appointment)=>{
    const confirmCancel = window.confirm(
            "Tem certeza que deseja cancelar este agendamento?"
          );
    if (!confirmCancel) return;

    const appointmentData = {
      id_user: user.id_user,
      appoint_date: appointment.appoint_date,
      id_appointments: appointment.id_appointments
    }

    const result = await deleteAppoint(appointmentData);

    if(result.success){
      alert(result.message);
      fetchAppointments();
    } else {
      alert(result.error)
    }
  }

  const handleCreateBarbers = ()=> {
    navigate('/createbarbers');
  }
  const handleBarberSpec = ()=> {
    navigate('/assocbarbspec');
  }

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.title}>
          <h2>Meus Agendamentos</h2>
        </div>
        <div className={styles.logout}>
          <div>
            <button 
              className={styles.confirmBtn}
              onClick={handleCreateAppointment}
            >
              Agende um horário
            </button>
            <button 
              onClick={handleLogout} 
              className={styles.logoutBtn}
            >
             Logout
            </button>
            {user && user.role_user === 'admin' && (
              <div>
                <button 
                  className={styles.barbBtn}
                  onClick={handleCreateBarbers}
                >
                  Adicionar barbeiros
                </button>
                <button 
                  className={styles.espesBtn}
                  onClick={() => handleCreateSpecialties()}
                >
                  Adicionar especialidades
                </button>
                <button 
                  className={styles.barbBtn}
                  onClick={handleBarberSpec}
                >
                  Associação Barbeiros e Especialidades 
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {error && <div className='error'>{error}</div>}

      {appointments.length === 0 ? (
        <div>
          <p>Nenhum agendamento foi encontrado.</p>
        </div>
      ) : (
        <div className={styles.appointmentsList}>
          {appointments.map((appointment)=> (
            <div 
              key = {appointment.id_appointments}
              className={styles.appointmentCard}
            >
              <p>Cliente: {appointment.name_user}</p>
              <p>Barbeiro: {appointment.name_barbers}</p>
              <p>Especialidade: {appointment.name_specialties}</p>
              <p>Data:{new Date(appointment.appoint_date).toLocaleString()}</p>
              <p>
                Status: 
                <span className={
                  appointment.appoint_status === 'scheduled' ? 
                  styles.statusScheduled : 
                  appointment.appoint_status === 'cancelled' ? 
                  styles.statusCancelled :  styles.statusCompleted
                }>
                  {{
                    'cancelled': 'Atendimento Cancelado',
                    'scheduled': 'Atendimento Agendado', 
                    'done': 'Atendimento Realizado'
                  }[appointment.appoint_status]}
                </span>
              </p>
              {appointment.appoint_status === 'scheduled' && 
               new Date(appointment.appoint_date) > new Date() && (
                <div className={styles.buttonContainer}>
                  <button 
                    className={styles.cancelBtn}
                    onClick={() => handleCancelAppointment(appointment)}
                  >
                    Cancelar agendamento
                  </button>
                </div>
               )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard;
