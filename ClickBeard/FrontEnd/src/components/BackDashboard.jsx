import { useNavigate } from 'react-router-dom';

const BackDashboard = ({ className }) => {
  const navigate = useNavigate();

  const handleBackDashboard = ()=>{
    navigate('/dashboard');
  }
  return (
      <button 
        className={className}
        onClick={handleBackDashboard}
      >
        Voltar para a Dashboard
      </button>
  )
}

export default BackDashboard
