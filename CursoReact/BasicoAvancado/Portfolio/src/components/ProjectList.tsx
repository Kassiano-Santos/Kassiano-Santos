import Grid from '@mui/material/Grid2';
import React from 'react';
import styles from './ProjectList.module.css'


const ProjectList = () => {
  return (
    <>
      <h1 className={styles.title}>Project List:</h1>
      <Grid size= {12} className= {styles.projectList}>
          <h3 className={styles.titleProjects}>Barbecue Calculator</h3>
          <p className={styles.textProjects}>Um projeto com o objetivo de 
            auxiliar pessoas que querem fazer um churrasco, exibindo quais 
            produtos cada um deveria levar e calculando quando cada pessoa
            levaria com base no número de pessoas. Além de React e Javascript, 
            foi utilizado a biblioteca Formik e YUP para validações do 
            formulário.
          </p>
          <button className={styles.buttons}>React.js</button>
          <button className={styles.buttons}>Javascript</button>
          <button className={styles.buttons}>Formik</button>
          <button className={styles.buttons}>Yup</button>
      </Grid>

      <Grid size={12} className= {styles.projectList}>
        <h3 className={styles.titleProjects}>To do List</h3>
        <p className={styles.textProjects}>Permite o usuário criar uma lista 
          de tarefas. O código foi implementado em React e javascript, com o
          objetivo de colocar em práticas os conceitos básicos e iniciais de
          React.</p>
        <button className={styles.buttons}>React.js</button>
        <button className={styles.buttons}>Javascript</button>
      </Grid>

      <Grid size={12} className= {styles.projectList}>
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

      <Grid size={12} className= {styles.projectList}>
        <h3 className={styles.titleProjects}>GitHub Finder</h3>
        <p className={styles.textProjects}>Permite o usuário de localizar 
          usuarios na plataforma do Github. Utilizando a API do Github para 
          fazer as buscas, o usuário ainda consegue ver o ranking de principais
          projetos ordenados de acordo com a avaliação feita por estrelas no Github. 
        </p>
        <button className={styles.buttons}>React.js</button>
        <button className={styles.buttons}>Typescript</button>
      </Grid>

      <Grid size= {12} className= {styles.projectList}>
        <h3 className={styles.titleProjects}>Photo Album</h3>
        <p className={styles.textProjects}>O projeto é um album de fotos, 
          utilizando o Axios, o album é alimentado pela API Unsplash. </p>
        <button className={styles.buttons}>React.js</button>
        <button className={styles.buttons}>Javascript</button>
      </Grid>
    </>
  )
}

export default ProjectList
