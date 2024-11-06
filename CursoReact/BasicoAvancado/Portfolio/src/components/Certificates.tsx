import  { useState } from 'react';
import Grid from '@mui/material/Grid2';
import styles from "./Certificates.module.css";
import FileHighSchoolJP from "./FileHighSchoolJP.js";
import FileHighSchoolEN from './FileHighSchoolEN.js';
import FileHighSchoolPT from './FileHighSchoolPT.js';
import FileEnglishCoursePT from './FileEnglishCoursePT.js';
import FileReactCertificateEN from './FileReactCertificateEN.js';
import FileReactCertificateJP from './FileReactCertificateJP.js';
import FileReactCertificatePT from './FileReactCertificatePT.js';
import FileEnglishCourseEN from './FileEnglishCourseEN.js';
import FileEnglishCourseJP from './FileEnglishCourseJP.js';
import FileJlptCertificate from './FileJlptCertificate.js';

const Certificates= ()=> {
  const [language1, setLanguage1] = useState("");
  const [language2, setLanguage2] = useState("");
  const [language3, setLanguage3] = useState("");

   return (
    <div>
      <h1 className={styles.titleCertificate}>Certificates:</h1>
        <Grid size = {12} className={styles.certificateList}>
          <h3 className={styles.subtitleCerticates}>Computer Science High School:</h3>
          <select 
            value={language1} 
            onChange={(e)=> setLanguage1(e.target.value)}
            className={styles.selectStyle}
          >
            <option >Language</option>
            <option >English</option>
            <option>Japanese</option>
            <option>Portuguese</option>
          </select>
          {language1 == "English"? <FileHighSchoolEN /> : ""}
          {language1 == "Japanese"? <FileHighSchoolJP /> : ""}
          {language1 == "Portuguese"? <FileHighSchoolPT /> : ""}
        </Grid>

      <Grid size = {12} className={styles.certificateList}>
        <h3 className={styles.subtitleCerticates}>Japanese Proeficiency Test:</h3>
        <FileJlptCertificate />
      </Grid>

      <Grid size = {12} className={styles.certificateList}>
          <h3 className={styles.subtitleCerticates}>React Certificate: </h3>
          <select 
            value={language2} 
            onChange={(e)=> setLanguage2(e.target.value)}
            className={styles.selectStyle}
          >
            <option>Language</option>
            <option>English</option>
            <option>Japanese</option>
            <option>Portuguese</option>
          </select>

          {language2 == "English"? <FileReactCertificateEN /> : ""}
          {language2 == "Japanese"? <FileReactCertificateJP /> : ""}
          {language2 == "Portuguese"? <FileReactCertificatePT /> : ""}
       </Grid>
      <Grid size = {12} className={styles.certificateList}>
       <h3 className={styles.subtitleCerticates}>English Course:</h3>
        <select 
          value={language3} 
          onChange={(e)=> setLanguage3(e.target.value)}
          className={styles.selectStyle}
        >
          <option>Language</option>
          <option>English</option>
          <option>Japanese</option>
          <option>Portuguese</option>
        </select>
        {language3 == "English"?  <FileEnglishCourseEN /> : ""}
        {language3 == "Japanese"?  <FileEnglishCourseJP /> : ""}
        {language3 == "Portuguese"?  <FileEnglishCoursePT /> : ""}
      </Grid>
    </div>
  )
}

export default Certificates;
