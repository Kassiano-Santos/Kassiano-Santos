import React from 'react';
import Grid from '@mui/material/Grid2';
import ReactTsUs from "../assets/React_TS_US.pdf";
import HighSchoolCertificate from "../assets/HighSchoolCertificate.pdf";
import styles from "./Certificates.module.css";

const Certificates= ()=> {
  const onReactCertificate = () => {
    const pdfReact = ReactTsUs;
    const link = document.createElement("a");
    link.href = pdfReact;
    link.download = "React_TS_US.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const onHishSchoolCertificate = () => {
    const pdfHighSchool = HighSchoolCertificate;
    const link = document.createElement("a");
    link.href = pdfHighSchool;
    link.download = "HighSchoolCertificate.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div>
      <h1 className={styles.titleCertificate}>Certificates:</h1>
      <Grid size = {12} className={styles.certificateList}>
        <h3 className={styles.subtitleCerticates}>Computer Science High School:</h3>
        <button onClick={onHishSchoolCertificate} className= {styles.certificateButton}> Download</button>
      </Grid>
      <Grid size = {12} className={styles.certificateList}>
        <h3 className={styles.subtitleCerticates}>Japanese Proeficiency Test:</h3>
      </Grid>
      <Grid size = {12} className={styles.certificateList}>
          <h3 className={styles.subtitleCerticates}>React Certificate: </h3>
          <button onClick={onReactCertificate} className= {styles.certificateButton}>Download</button>
       </Grid>
      <Grid size = {12} className={styles.certificateList}>
        <h3 className={styles.subtitleCerticates}>English Course:</h3>
      </Grid>
      <Grid size = {12} className={styles.certificateList}>
        <h3 className={styles.subtitleCerticates}>Javascript Alura Course:</h3>
      </Grid>
    </div>
  )
}

export default Certificates;
