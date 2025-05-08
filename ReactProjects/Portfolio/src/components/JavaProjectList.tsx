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
                A project developed to help organize barbecues by calculating the 
                necessary quantities and types of items based on the number of 
                guests. In addition to React and JavaScript, we used the Formik 
                and Yup libraries for form validation.
              </p>
              <button className={styles.buttons}>React.js</button>
              <button className={styles.buttons}>Javascript</button>
              {/*
              <button className={styles.buttons}>Formik</button>
              <button className={styles.buttons}>Yup</button>
              */}
              <button className={styles.buttons}>Java Spring Boot</button>
            </Link>
        </Grid>
    </Grid>
  )
}
export default JavaProjectList;