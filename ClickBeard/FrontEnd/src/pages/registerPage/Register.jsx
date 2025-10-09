import React from 'react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from '../registerPage/Register.module.css'
import { authAPI } from '../../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange= (e)=>{
    setFormData({
      ...formData,
    [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setError('');
    setLoading(true);
    
      if(formData.password != formData.confirmPassword){
        setError("As senhas precisam ser iguais");
        setLoading(false);
        return;
      }
      if(formData.password.length < 6){
        setError("A senha deve conter no mínimo 6 caracteres");
        setLoading(false);
        return;
      }

    try {
      const response = await register(
        formData.name, 
        formData.email,
        formData.password
      );

      if(response && response.success){
        navigate("/dashboard");
      } else {
        setError(response?.error || 'Erro no cadastro');
      }
    } catch (error) {
      setError("Erro ao criar usuário: " + error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className={styles.conteiner}>
      <div>
        <h1>ClickBeard</h1>
      </div>

      <div className={styles.box}>
        {error && <div className="error">{error}</div>}
        <h2>Crie sua conta</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <label className={styles.formLabel}>
              Nome:
              <input 
                type='text'
                value = {formData.name}
                name='name'
                placeholder='Digite seu nome'
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </label>
          </div>

          <div className={styles.formRow}>
            <label className={styles.formLabel}>
              Email:
              <input 
                type='email'
                value = {formData.email}
                name='email'
                placeholder='Digite seu nome'
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </label>
          </div>

          <div className={styles.formRow}>
            <label className={styles.formLabel}>
              Senha:
              <input 
                type='password'
                value = {formData.password}
                name='password'
                placeholder='Digite seu nome'
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </label>
          </div>

          <div className={styles.formRow}>
            <label className={styles.formLabel}>
              Confirme sua senha: 
              <input 
                type='password'
                value = {formData.confirmPassword}
                name='confirmPassword'
                placeholder='Confirme sua senha'
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </label>
          </div>
          <button 
            type='submit' 
            disabled = {loading}
            className="confirmBtn"
          > 
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register