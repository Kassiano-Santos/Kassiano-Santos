import { useState } from 'react'

export const useDateFormatter = (initialValue = '') => {
  const [dateValue, setDateValue] = useState(initialValue); 

  const handleDateChange = (e) => {
  let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
  
  // Aplica a máscara: DD/MM/AAAA HH:MM
  if (value.length > 2) value = value.replace(/(\d{2})/, '$1/');
  if (value.length > 5) value = value.replace(/(\d{2})\/(\d{2})/, '$1/$2/');
  if (value.length > 10) value = value.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$1/$2/$3 ');
  if (value.length > 13) value = value.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2})/, '$1/$2/$3 $4:');
  
  // Limita o tamanho máximo
  value = value.substring(0, 16); // DD/MM/AAAA HH:MM
  
  setDateValue(value);
};

const formatDateForBackend = (dateString = dateValue) => {
  if (!dateString || dateString.length < 16) return null;
  
  // Converte "DD/MM/AAAA HH:MM" para "AAAA-MM-DDTHH:MM:00"
  const [datePart, timePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('/');
  
  return `${year}-${month}-${day}T${timePart}:00`;
};
  const clearDate = () => {
    setDateValue('');
  };

  const setDate = (value) => {
    setDateValue(value);
  };

  return {
    dateValue,
    handleDateChange,
    formatDateForBackend,
    clearDate,
    setDate
  };
}

