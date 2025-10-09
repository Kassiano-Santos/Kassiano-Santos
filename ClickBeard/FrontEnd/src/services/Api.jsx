import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  // Cadastro de usuário
  register: (userData) => api.post('/users/createuser', userData),
  
  // Login
  login: (credentials) => api.post('/users/login', credentials),
  
  // Buscar todos os agendamentos (protegido)
  getAppointments: () => api.get('/appointments'),

    // Criar agendamentos
  createAppointments: (appointmentData) => api.post(
    '/appointments/createappoint',appointmentData
  ),
      // deletar agendamentos (protegido)
  deleteAppointment: (appointmentData) => api.post(
    '/appointments/deleteappoint',appointmentData
  ),

  createSpecialty: (createDataSpecialty) => api.post(
    '/specialties/createspecialty',createDataSpecialty
  ),
  createBarbers: (createDataBarbers) => api.post(
    '/barbers/createbarbers', createDataBarbers
  ),
  createBarbersSpecialty: (createDataBarbersSpecialty) => api.post(
    '/barbers/assocbarbspec/bulk', createDataBarbersSpecialty 
  ),

};

export default api;