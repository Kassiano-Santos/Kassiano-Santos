import Grid from '@mui/material/Grid2';
import styles from './JavaProjectList.module.css';
import { Link } from "react-router-dom";

const JavaProjectList = ()=> {
  return (
    <Grid container spacing={2}>
      <h1 className={styles.title}>Java Project List:</h1>
        <Grid size={{xl:12, xs: 12}} className= {styles.projectList}>
            <Link 
              to= "/inventorymanagerproduct" 
              className={styles.titleProjects}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>Inventory Manager Product</h3>
          
              <p className={styles.textProjects}>
              This project was developed to strengthen my skills in Java and 
              Spring Boot. It features a RESTful API that uses SQLite as the 
              database and provides full CRUD functionality for product 
              registration and removal. The application simulates a basic 
              inventory management system, with a clean and modular codebase 
              suitable for further expansion.
              The front-end was built using React and TypeScript, ensuring a 
              modern, responsive user interface.
              </p>
              
              <button className={styles.buttons}>React.js</button>
              <button className={styles.buttons}>Typescript</button>
              {/*
              <button className={styles.buttons}>Formik</button>
              <button className={styles.buttons}>Yup</button>
              */}
              <button className={styles.buttons}>Java Spring Boot</button>
              <button className={styles.buttons}>Java JDK22</button>
            </Link>
        </Grid>
    </Grid>
  )
}
export default JavaProjectList;