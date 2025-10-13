import { Container } from '@mui/material';
import BarbecueCalculator from '../components/BarbecueCalculator.tsx';
import { Outlet } from 'react-router-dom';

const Calculator = ()=> {
  
  return (
      <Container 
        maxWidth={false} 
        sx={{height: "100%",  position: "fixed", backgroundColor: "#0a192f"}}
        >
        <Outlet />
        <BarbecueCalculator />
      </Container>
      
  );
};
export default Calculator;