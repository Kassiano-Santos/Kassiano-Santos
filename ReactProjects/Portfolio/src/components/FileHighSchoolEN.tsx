import HighSchoolCertificateEN from "../assets/HighSchoolCertificateEN.pdf";
import styles from "./Certificates.module.css";

const FileHighSchoolEN = () => {
  const onReactCertificate = () => {
    const pdfHighSchool = HighSchoolCertificateEN;
    const link = document.createElement("a");
    link.href = pdfHighSchool;
    link.download = "HighSchoolCertificateEN.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className={styles.text}>
      <p>Certificate High School in English:</p> 
      <button onClick={onReactCertificate} className= {styles.certificateButton}> Download</button>
    </div>
  )
}

export default FileHighSchoolEN
