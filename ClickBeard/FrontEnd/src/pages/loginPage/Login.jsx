import React, { useState } from 'react';
import styles from '../loginPage/Login.module.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import bigode from '../../assets/bigode.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
    if(result.success){
      navigate("/dashboard");
    } else {
      setError(result.error);
    }
    } catch (error) {
      setError('Erro Inesperado.');
    } finally{
      setLoading(false);
    }
  }
  return (
    <>
      <div className={styles.conteiner}>
        <div className={styles.leftSide}>
            <h1>ClickBeard</h1>
            <p>Cadastre-se e angende um horário na melhor barbearia do ES</p>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.box}>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit} className={styles.form}>
              <label className={styles.label}>
                <input 
                  required
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Informe o E-mail"
                  onChange={(e)=>setEmail(e.target.value)}
                  className={styles.input}
                />
              </label>
              <label>
                <input 
                required
                type="password"
                name="password"
                value={password}
                placeholder="Informe a Senha"
                onChange={(e)=> setPassword(e.target.value)}
                className={styles.input}
                />
              </label>
              <button 
                type = "submit" 
                className="confirmBtn"
              >
                 {loading ? 'Entrando...' : 'Login'}
              </button>
            </form>
            <div className={styles.registerSection}>
              <button 
                className={styles.registerBtn} 
                onClick= {()=> navigate('/register')}
              >
                Cadastre-se
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;