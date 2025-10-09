import { useState, useEffect } from 'react';
export const useFetchSpecialties = ()=> {

  const [specialtyList, setSpecialtyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchSpecialties = async ()=> {
      try {
        setLoading(true)
        
        const response = await fetch('http://localhost:3000/specialties');

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        setSpecialtyList(data);
        setError(null);
      } catch (error) {
        setError("Erro ao carregar especialidades. " + error)
      } finally {
        setLoading(false);
      }
  }
  fetchSpecialties();
  },[]);

    return {
    specialtyList,
    loading,
    error
  };

  
}

