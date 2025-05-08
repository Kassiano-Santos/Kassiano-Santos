import EnglishCourseEN from "../assets/EnglishCourseEN.pdf";
import styles from "./Certificates.module.css";

const FileEnglishCourseEN = () => {
  const onReactCertificate = () => {
    const pdfHighSchool = EnglishCourseEN;
    const link = document.createElement("a");
    link.href = pdfHighSchool;
    link.download = "EnglishCourseEN.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
return (
  <div className={styles.text}>
    <p>Certificate English Course in English:</p> 
    <button onClick={onReactCertificate} className= {styles.certificateButton}> Download</button>
  </div>
)
}
export default FileEnglishCourseEN;
