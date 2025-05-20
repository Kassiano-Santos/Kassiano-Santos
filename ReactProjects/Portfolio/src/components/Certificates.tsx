import  { useState } from 'react';
import Grid from '@mui/material/Grid2';
import styles from "./Certificates.module.css";
import FileHighSchoolJP from "./FileHighSchoolJP.tsx";
import FileHighSchoolEN from './FileHighSchoolEN.tsx';
import FileHighSchoolPT from './FileHighSchoolPT.tsx';
import FileEnglishCoursePT from './FileEnglishCoursePT.js';
import FileReactCertificateEN from './FileReactCertificateEN.tsx';
import FileReactCertificateJP from './FileReactCertificateJP.tsx';
import FileReactCertificatePT from './FileReactCertificatePT.tsx';
import FileEnglishCourseJP from './FileEnglishCourseJP.tsx';
import FileEnglishCourseEN from './FileEnglishCourseEN.tsx';
import FileJlptCertificate from './FileJlptCertificate.tsx';
import FileJavaCourseEN from './FileJavaCourseEN.tsx';
import FileJavaCourseJP from './FileJavaCourseJP.tsx';
import FileJavaCoursePT from './FileJavaCoursePT.tsx';

const Certificates= ()=> {
  const [language1, setLanguage1] = useState("");
  const [language2, setLanguage2] = useState("");
  const [language3, setLanguage3] = useState("");
  const [language4, setLanguage4] = useState("");

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
        {language3 == "English" ? <FileEnglishCourseEN /> : ""}
        {language3 == "Japanese" ? <FileEnglishCourseJP /> : ""}
        {language3 == "Portuguese" ? <FileEnglishCoursePT /> : ""}
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
       <h3 className={styles.subtitleCerticates}>Java/Spring Boot Certificate:</h3>
        <select 
          value={language4} 
          onChange={(e)=> setLanguage4(e.target.value)}
          className={styles.selectStyle}
        >
          <option>Language</option>
          <option>English</option>
          <option>Japanese</option>
          <option>Portuguese</option>
        </select>
        {language4 == "English" ? <FileJavaCourseEN /> : ""}
        {language4 == "Japanese" ? <FileJavaCourseJP /> : ""}
        {language4 == "Portuguese" ? <FileJavaCoursePT /> : ""}
      </Grid>
    </div>
  )
}

export default Certificates;
