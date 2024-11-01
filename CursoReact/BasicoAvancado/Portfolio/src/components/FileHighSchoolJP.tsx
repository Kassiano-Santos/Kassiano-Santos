import HighSchoolCertificateJP from "../assets/HighSchoolCertificateJP.pdf";
import styles from "./Certificates.module.css";

const FileHighSchoolJP = () => {
  const onReactCertificate = () => {
    const pdfHighSchool = HighSchoolCertificateJP;
    const link = document.createElement("a");
    link.href = pdfHighSchool;
    link.download = "HighSchoolCertificateJP.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className={styles.text}>
      <p>Certificate High School in Japanese:</p> 
      <button onClick={onReactCertificate} className= {styles.certificateButton}> Download</button>
    </div>
  )
}

export default FileHighSchoolJP;
