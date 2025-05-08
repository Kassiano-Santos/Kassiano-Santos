import EnglishCoursePT from "../assets/EnglishCoursePT.pdf";
import styles from "./Certificates.module.css";

const FileEnglishCoursePT = () => {
  const onReactCertificate = () => {
    const pdfHighSchool = EnglishCoursePT;
    const link = document.createElement("a");
    link.href = pdfHighSchool;
    link.download = "EnglishCoursePT.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
return (
  <div className={styles.text}>
    <p>Certificate English Course in Portuguese:</p> 
    <button onClick={onReactCertificate} className= {styles.certificateButton}> Download</button>
  </div>
)
}
export default FileEnglishCoursePT;
