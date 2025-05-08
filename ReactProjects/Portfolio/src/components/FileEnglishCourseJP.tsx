import EnglishCourseJP from "../assets/EnglishCourseJP.pdf";
import styles from "./Certificates.module.css";

const FileEnglishCourseJP = () => {
  const onReactCertificate = () => {
    const pdfHighSchool = EnglishCourseJP;
    const link = document.createElement("a");
    link.href = pdfHighSchool;
    link.download = "EnglishCourseJP.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
return (
  <div className={styles.text}>
    <p>Certificate English Course in Japanese:</p> 
    <button onClick={onReactCertificate} className= {styles.certificateButton}> Download</button>
  </div>
)
}
export default FileEnglishCourseJP;
