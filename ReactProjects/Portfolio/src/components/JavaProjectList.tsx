import  Grid from '@mui/material/Grid2';
import styles from './JavaProjectList.module.css';
import { Link } from "react-router-dom";
import {ProductInventoryVideo, ClimatesInformationVideo, ShoppingListVideo} from './DemoModal';
import { ArrowDownToLine } from "lucide-react";
import GitHubIcon from '@mui/icons-material/GitHub';

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
            <button className={styles.buttons}>Formik</button>
            <button className={styles.buttons}>Yup</button>
            <button className={styles.buttons}>Java Spring Boot</button>
          </Link>
      </Grid>
			
      <Grid size={{xl:12, xs: 12}} className= {styles.projectList}>
        <Grid size = "auto" className = {styles.titleProjects}>
          <h3>Inventory Manager Product With JavaFX</h3>
          <p className={styles.textProjects}>
            This project was created to deepen my knowledge of Java. To achieve 
            this, I developed a CRUD application for inventory control using 
            Java SDK 22, JavaFX 24 for the user interface, and SQLite as the 
            database.
          </p>
          <Grid>
            <Grid className={styles.LinkJavaProjectsJar}>
              <Link
                to= "https://res.cloudinary.com/dtqvzimvv/raw/upload/v1747121636/ProductInventoryManagerJar.jar"
                target="_blank"
                className={styles.LinkJavaProjects}
                rel="noopener noreferrer"
              >
                <ArrowDownToLine className={styles.icon}/>
                Download .JAR
              </Link>
            </Grid>
            <Grid className={styles.LinkJavaProjectsVideo}>
              <Link
                to= "https://github.com/Kassiano-Santos/Kassiano-Santos/tree/main/JavaProjects/ProductInventoryManagerProject/src" 
                target="_blank"
                className={styles.LinkJavaProjects}
                rel="noopener noreferrer"
              > 
                <GitHubIcon sx={{fontSize: "25px", mr: "20px"}}/>
                See Code in GitHub
              </Link>
            </Grid>
              {ProductInventoryVideo()}
          </Grid>
          <button className={styles.buttons}>Java JDK22</button>
          <button className={styles.buttons}>JavaFX 24</button>
        </Grid>
      </Grid>
      <Grid size={{xl:12, xs: 12}} className= {styles.projectList}>
        <Grid size = "auto" className = {styles.titleProjects}>
          <h3>Climates Information</h3>
          <p className={styles.textProjects}>
            This project was developed to deepen my knowledge of Java and to 
            gain hands-on experience working with external APIs. It uses the 
            Weather API to provide weather information for cities around the 
            world and was built with Java 22 and SQLite.
          </p>
          <Grid>
            <Grid className={styles.LinkJavaProjectsJar}>
              <Link
                to= "https://res.cloudinary.com/dtqvzimvv/raw/upload/v1747121636/ClimateInformationJar.jar" 
                className={styles.LinkJavaProjects}
                target="_blank"
                rel="noopener noreferrer"
              > 
                <ArrowDownToLine className={styles.icon}/>
                Download .Jar
              </Link>
            </Grid>
            <Grid className={styles.LinkJavaProjectsVideo}>
              <Link
                to= "https://github.com/Kassiano-Santos/Kassiano-Santos/tree/main/JavaProjects/ClimateInformationProject/src" 
                className={styles.LinkJavaProjects}
                target="_blank"
                rel="noopener noreferrer"
              > 
                <GitHubIcon sx={{fontSize: "25px", mr: "20px"}}/>
                See Code in GitHub
              </Link>
            </Grid>
              {ClimatesInformationVideo()}
          </Grid>
          <button className={styles.buttons}>Java JDK22</button>
          <button className={styles.buttons}>JavaFX 24</button>
          <button className={styles.buttons}>Weather API</button>
        </Grid>
      </Grid>
      
      <Grid size={{xl:12, xs: 12}} className= {styles.projectList}>
        <Grid size = "auto" className = {styles.titleProjects}>
          <h3>Shopping List</h3>
          <p className={styles.textProjects}>
            A relatively simple GUI application created to apply the knowledge 
            I gained in JavaFX and Java 22. It allows users to add products to 
            a list through a JavaFX-based interface. After adding the items, 
            the list can be exported to a file.
          </p>
          <Grid>
            <Grid className={styles.LinkJavaProjectsJar}>
              <Link
                to= "https://res.cloudinary.com/dtqvzimvv/raw/upload/v1747121636/ShoppingListJar.jar" 
                className={styles.LinkJavaProjects}
                target="_blank"
                rel="noopener noreferrer"
              > 
              <ArrowDownToLine className={styles.icon}/>
                Download .Jar
              </Link>
            </Grid>
            <Grid className={styles.LinkJavaProjectsVideo}>
              <Link
                to= "https://github.com/Kassiano-Santos/Kassiano-Santos/tree/main/JavaProjects/ShoppingListProject/src" 
                className={styles.LinkJavaProjects}
                target="_blank"
                rel="noopener noreferrer"
              > 
                <GitHubIcon sx={{fontSize: "25px", mr: "20px"}}/>
                See Code in GitHub
              </Link>
            </Grid>
              {ShoppingListVideo()}
          </Grid>
          <button className={styles.buttons}>Java JDK22</button>
          <button className={styles.buttons}>JavaFX 24</button>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default JavaProjectList;