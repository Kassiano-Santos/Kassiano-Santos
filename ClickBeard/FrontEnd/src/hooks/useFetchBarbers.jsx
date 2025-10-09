import React from 'react'
import { useEffect,useState } from 'react';

export const useFetchBarbers = () => {
  const [allBarbers, setAllBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchAllBarbers = async()=> {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/barbers`
        );

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        setAllBarbers(data);
        setError(null);
      } catch (error) {
        setError("Erro ao carregar barbeiros. " + error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllBarbers();
  },[]);

  return {
    allBarbers,
    loading,
    error
  };
}
