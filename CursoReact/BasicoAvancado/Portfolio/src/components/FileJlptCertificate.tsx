import JLPTCertificate from "../assets/JLPTCertificate.pdf";
import styles from "./Certificates.module.css";

const FileJlptCertificate = () => {
  const onReactCertificate = () => {
    const pdfHighSchool = JLPTCertificate;
    const link = document.createElement("a");
    link.href = pdfHighSchool;
    link.download = "JLPTCertificate.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <div className={styles.text}>
      <p>JLPT N2 Certificate:</p> 
      <button onClick={onReactCertificate} className= {styles.certificateButton}> Download</button>
    </div>
  )
}

export default FileJlptCertificate;
