import styles from './CreateSpecialties.module.css'
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import BackDashboard from '../../components/BackDashboard';

const CreateSpecialties = () => {
  const [selectedBarber, setSelectedBarber] = useState('');
  const [specialty, setSpecialty] = useState('');
  
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const {user, createSpecialty} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!user || !user.id_user) {
      setError('Usuário não autenticado. Faça login novamente.');
      setLoading(false);
      return;
    }

    try {
    const createDataSpecialty = {name_specialties: specialty};

    const response = await createSpecialty(createDataSpecialty);

    if(response.success){
      setSuccess("Especialidade criada com sucesso.");
      setSpecialty('');

      setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
    } else {
        setError(response.error);
      }
    } catch (error) {
      setError('Erro ao criar especialidade: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <header>
        <BackDashboard className={styles.backBtn}/>
        <div>
          <h1>Cadastro de especialidades</h1>
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
              Especialidade:
              <input 
                type="text"
                className={styles.formInput}
                value={specialty}
                onChange={(e)=> setSpecialty(e.target.value)}
              />
            </label>
          </div>
          <button className={styles.submitBtn}>Criar</button>
        </div>
      </form>
    </div>
  )
}

export default CreateSpecialties
