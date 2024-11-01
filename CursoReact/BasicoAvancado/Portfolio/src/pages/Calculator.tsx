import { Container, CssBaseline } from '@mui/material';
import BarbecueCalculator from '../components/BarbecueCalculator.tsx';
import Grid from '@mui/material/Grid2';
import styles from "./Pages.module.css"

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