import Grid from '@mui/material/Grid2';
import styles from './ReactProjectList.module.css';
import { Link } from "react-router-dom";

const ReactProjectList = () => {
  return (
    <>
      <h1 className={styles.title}>React Project List:</h1>
      <Grid size={{xl:12, xs: 12}} className= {styles.projectList}>
          <Link 
            to= "/barbecuecalculator" 
            className={styles.titleProjects}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>Barbecue Calculator</h3>
          <p className={styles.textProjects}>
            A project developed to help organize barbecues by calculating the 
            necessary quantities and types of items based on the number of 
            guests. In addition to React and JavaScript, we used the Formik 
            and Yup libraries for form validation.
          </p>
          <button className={styles.buttons}>React.js</button>
          <button className={styles.buttons}>Javascript</button>
          <button className={styles.buttons}>Formik</button>
          <button className={styles.buttons}>Yup</button>
          </Link>
      </Grid>

      <Grid size={12} className= {styles.projectList}>
        <Link 
          to = "/todolist"
          className={styles.titleProjects}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3>To do List</h3>
          <p className={styles.textProjects}>
          This project is a simple to-do list where users can add and delete 
          tasks. The code was implemented in React and JavaScript to practice 
          foundational React concepts.
          </p>
          <button className={styles.buttons}>React.js</button>
          <button className={styles.buttons}>Javascript</button>
          </Link>
      </Grid>

      <Grid size={{xl:12, xs: 12}} className= {styles.ecomerce}>
        <h3 className={styles.titleProjects}>E-comerce Project</h3>
        <p className={styles.textProjects}>Um simples e-comerce onde não foram 
          implementadas as partes mais burocráticas de um e-comerce completo, 
          mas faz algumas validações e permite o usuario selecionar o que ele 
          quer comprar, colocar os produtos em um carrinho além de fazer o 
          cálculo da compra.
        </p>
        <button className={styles.buttons}>React.js</button>
        <button className={styles.buttons}>Javascript</button>
        <button className={styles.buttons}>Toastify</button>
      </Grid>

      <Grid size={{xl:12, xs: 12}} className= {styles.projectList}>
        <Link 
          to="/githubfinder"
          className={styles.titleProjects}
          target="_blank"
          rel="noopener noreferrer"
          >
          <h3>GitHub Finder</h3>
          <p className={styles.textProjects}>
          Allows users to search for profiles on the GitHub platform using the
          GitHub API for efficient searching. Additionally, users can view a 
          ranking of top projects, sorted by star rating to highlight their 
          popularity and community approval on GitHub. 
          </p>
          <button className={styles.buttons}>React.js</button>
          <button className={styles.buttons}>Typescript</button>
        </Link>
      </Grid>

      <Grid size= {12} className= {styles.projectList}>
        <Link 
          to= "/game"
          className={styles.titleProjects}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3>Memory Game</h3>
        
        <p className={styles.textProjects}>
          This project is a memory game with letters, where the player has 20 
          chances to match the position of each letter on the board. 
        </p>
        <button className={styles.buttons}>React.js</button>
        <button className={styles.buttons}>Javascript</button>
        </Link>
      </Grid>
    </>
  )
}

export default ReactProjectList;
