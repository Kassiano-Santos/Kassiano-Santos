import { createContext, useContext, useState } from 'react';
import { authAPI } from '../services/api';
import { useEffect } from 'react';

const AuthContext = createContext();

export const useAuth= ()=>{
  return useContext(AuthContext);
};

export const AuthProvider = ({children}) =>{
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (error) {
        return null;
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(false);
  const [appLoading, setAppLoading] = useState(true);

  const login = async(email, password)=>{
    setLoading(true);
    try {
      const response = await authAPI.login({
        email_user: email,
        password_hash: password
      });

      const {token, user: userData} = response.data;

      if (!token) {
      throw new Error('Token não recebido');
    }
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true };

    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao realizar login'
      }
    } finally{
      setLoading(false);
    }
  };

  const register = async (name, email, password)=>{
    setLoading(true);
    try {
      const response = await authAPI.register({
        name_user: name,
        email_user: email,
        password_hash: password,
        role_user: 'client'
      });

      const loginResult = await authAPI.login({
        email_user: email,
        password_hash: password
      });

      const {token, user} = loginResult.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);


      return {success: true};

    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro no cadastro'
      };
    } finally {
      setLoading(false);
    }
  };

  const getAppointments = async ()=> {
    setLoading(true);
    try {
      const response = await authAPI.getAppointments();

      if (!response.data) {
      throw new Error("Dados não recebidos do servidor");
    }

      return {
        success: true,
        appointments: response.data
      }

    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao exibir agendamento'
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }

  const createAppointments = async (appointmentData)=> {
    setLoading(true);

    try {
      const response = await authAPI.createAppointments(appointmentData);

      return {
        success: true,
        appointments: response.data
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao criar agendamento'
      }
    } finally {
      setLoading(false);
    }
  };
  
  const createSpecialty = async(createDataSpecialty)=> {
    setLoading(true);

    try {
      const response = await authAPI.createSpecialty(createDataSpecialty);
        if(response.success){
          return {
          success: true,
          specialties: response.data
        } 
      } else {
        return {
          success: false,
          specialties: ''
        }
      } 
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao criar especialidade'
      }
    } finally {
      setLoading(false);
    }
  };
  const createBarbers = async(createDataBarbers)=> {
    try {
      const response = await authAPI.createBarbers(createDataBarbers);

     if(response.data){
          return {
          success: true,
          barber: response.data
        }
      } else {
        return {
          success: false,
          error: 'Resposta inválida do servidor'
        }
      } 
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao criar novo barbeiro'
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteAppoint = async(appointmentData)=>{
    setLoading(true);
    try {
      const { id_user, id_appointments, appoint_date } = appointmentData;

       if (!id_user || !id_appointments || !appoint_date) {
        return {
          success: false,
          error: "Dados do agendamento incompletos"
        };
      }
      const response = await authAPI.deleteAppointment({
        id_user, id_appointments, appoint_date
      });
      return {
        success: true,
        message: response.data?.message || "Agendamento cancelado com sucesso",
        appointment: response.data?.appointment
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 
                          "Erro ao cancelar agendamento. Tente novamente.";
      
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }

  const createBarbersSpecialty = async(createDataBarbersSpecialty)=> {
    try {
      console.log("createDataBarbersSpecialty: ", createDataBarbersSpecialty);
      const response = await authAPI.createBarbersSpecialty(
        createDataBarbersSpecialty
      );

     if(response.data){
          return {
          success: true,
          barber: response.data
        }
      } else {
        return {
          success: false,
          error: 'Resposta inválida do servidor'
        }
      } 
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao realizar associação'
      }
    } finally {
      setLoading(false);
    }

  }

  const value = {
    user,
    setUser,
    login,
    logout,
    loading,
    register,
    getAppointments,
    createAppointments,
    deleteAppoint,
    createSpecialty,
    createBarbers,
    createBarbersSpecialty
  }
  return (
    <AuthContext.Provider value = {value}>
      {children}
    </AuthContext.Provider>
  );
}

  
