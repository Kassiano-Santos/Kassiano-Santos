import ReactCourseJP from "../assets/ReactCourseJP.pdf";
import styles from "./Certificates.module.css";

const FileReactCertificateJP = () => {
  const onReactCertificate = () => {
    const pdfHighSchool = ReactCourseJP;
    const link = document.createElement("a");
    link.href = pdfHighSchool;
    link.download = "ReactCourseJP.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <div className={styles.text}>
      <p>Certificate High School in Portuguese:</p> 
      <button onClick={onReactCertificate} className= {styles.certificateButton}> Download</button>
    </div>
  )
}

export default FileReactCertificateJP;
