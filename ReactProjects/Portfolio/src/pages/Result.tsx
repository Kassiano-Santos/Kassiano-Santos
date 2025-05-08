import { Container } from '@mui/material';
import BarbecueResult from '../components/BarbecueResult';
import styles from "./Pages.module.css";

const Result = ()=> {
  return (
    <Container maxWidth={false} sx={{height: "100%",  position: "fixed", backgroundColor: "#0a192f"}}>
      <h1 className={styles.title}>Barbecue Result</h1>
      <BarbecueResult />
    </Container>
  );
};
export default Result;