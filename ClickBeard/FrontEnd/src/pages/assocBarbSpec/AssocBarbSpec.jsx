import { useState } from 'react';
import { useFetchSpecialties } from '../../hooks/useFetchSpecialties';
import { useFetchBarbers } from '../../hooks/useFetchBarbers';
import { useAuth } from '../../context/AuthContext';
import styles from './AssocBarbSpec.module.css';
import BackDashboard from '../../components/BackDashboard';

const AssocBarbSpec = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [success, setSuccess] = useState('');

  const {createBarbersSpecialty} = useAuth();

  const {
    allBarbers, 
    loading: loadingBarbers, 
    error: barbersError
  } = useFetchBarbers();

  const {
    specialtyList, 
    loading: loadingSpecialties, 
    error: specialtiesError
  } = useFetchSpecialties();

  const handleBarberSelect = (barber)=> {
    setSelectedBarber(barber);
  }

  const handleSpecialtySelect =(specialty)=>{
    setSelectedSpecialties(prev => {
      const isAlreadySelected = prev.find(
        s => s.id_specialties === specialty.id_specialties
      );
      if(isAlreadySelected){
        return prev.filter(s => s.id_specialties !== specialty.id_specialties);
      } else {
        return [...prev, specialty]
      }
    });
  };

  const handleAssociate = async()=> {
    if(!selectedBarber){
      setError("Selecione um barbeiro");
      return;
    }

    if(selectedSpecialties.length === 0){
      setError('Selecione pelo menos uma especialidade');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const specialtyIds = selectedSpecialties
      .map(specialty => specialty.id_specialties);

      const result = await createBarbersSpecialty({
        id_barber: selectedBarber.id_barber,
        specialties: specialtyIds
      });

      if (result.success) {
        setSuccess('Todas as associações criadas com sucesso!');
        setSelectedSpecialties([]);
        setSelectedBarber(null);
      } else {
        setError(result.error);
      }
      
    } catch (error) {
      setError('Erro ao criar associações: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loadingBarbers || loadingSpecialties) {
    return <div>Carregando...</div>;
  }

  if (barbersError || specialtiesError) {
    return <div>Erro: {barbersError || specialtiesError}</div>;
  }

  return (
   <div className={styles.container}>
       <header className={styles.header}>
        <div className={styles.title}>
          <BackDashboard className={styles.backBtn}/>
          <h1>Associar Barbeiros e Especialidades</h1>
        </div>
      </header>
      {success && (
        <div className={styles.success}>
          {success}
        </div>
      )}
      {/* MENSAGEM DE ERRO */}
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.content}>
        {/* Coluna dos Barbeiros */}
        <div className={styles.column}>
          <h3>Barbeiros</h3>
          <div className={styles.list}>
            {allBarbers.map(barber => (
              <div
                key={barber.id_barber}
                className={`${styles.item} ${selectedBarber?.id_barber === barber.id_barber ? styles.selected : ''}`}
                onClick={() => handleBarberSelect(barber)}
              >
                <input
                  type="radio"
                  name="barber"
                  checked={selectedBarber?.id_barber === barber.id_barber}
                  onChange={() => handleBarberSelect(barber)}
                  className={styles.radio}
                />
                <span>{barber.name_barbers}</span>
                {barber.age_barber && <span className={styles.age}>({barber.age_barber} anos)</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Coluna das Especialidades */}
        <div className={styles.column}>
          <h3>Especialidades</h3>
          <div className={styles.list}>
            {specialtyList && specialtyList.map(specialty => (
              <div
                key={specialty.id_specialties}
                className={styles.item}
              >
                <input
                  type="checkbox"
                  checked={selectedSpecialties.some(s => s.id_specialties === specialty.id_specialties)}
                  onChange={() => handleSpecialtySelect(specialty)}
                  className={styles.checkbox}
                />
                <span>{specialty.name_specialties}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Barbeiro Selecionado */}
      {selectedBarber && (
        <div className={styles.selectedBarber}>
          <strong>Barbeiro selecionado:</strong> {selectedBarber.name_barbers}
        </div>
      )}

      {/* Especialidades Selecionadas */}
      {selectedSpecialties.length > 0 && (
        <div className={styles.selectedSpecialties}>
          <strong>Especialidades selecionadas:</strong>{' '}
          {selectedSpecialties.map(s => s.name_specialties).join(', ')}
        </div>
      )}

      <button
        className={styles.associateBtn}
        onClick={handleAssociate}
        disabled={loading || !selectedBarber || selectedSpecialties.length === 0}
      >
        {loading ? 'Associando...' : 'Associar'}
      </button>
    </div>
  );
};

export default AssocBarbSpec
