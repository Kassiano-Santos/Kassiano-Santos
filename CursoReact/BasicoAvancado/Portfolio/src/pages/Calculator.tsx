import { Container } from '@mui/material';
import BarbecueCalculator from '../components/BarbecueCalculator.tsx';

const Calculator = ()=> {
  
  return (
      <Container 
        maxWidth={false} 
        sx={{height: "100%",  position: "fixed", backgroundColor: "#0a192f"}}
        >
        <BarbecueCalculator />
      </Container>
      
  );
};
export default Calculator;