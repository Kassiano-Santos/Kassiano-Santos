import { Container } from '@mui/material';
import ToDoList from '../components/ToDoList.jsx';
import styles from "./Pages.module.css";
import  Grid from '@mui/material/Grid2';

const ToDoListPage = () => {
  return (
    <Container 
      maxWidth={false} 
      sx={{height: "100%",  position: "fixed", backgroundColor: "#0a192f"}}
    >
      <h1 className={styles.taskTitle}>Task List</h1>
      <ToDoList/>
    </Container>
  )
}

export default ToDoListPage
