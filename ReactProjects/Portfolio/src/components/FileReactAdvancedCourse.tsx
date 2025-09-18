import MetaCourseCertificate from "../assets/MetaCourseCertificate.pdf";
import styles from "./Certificates.module.css";

const FileReactAdvancedCourse = () => {
  const onReactCertificate = () => {
    const pdfMetaCourseCertificate = MetaCourseCertificate;
    const link = document.createElement("a");
    link.href = pdfMetaCourseCertificate;
    link.download = "MetaCourseCertificate.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <div className={styles.text}>
      <button onClick={onReactCertificate} className= {styles.certificateButton}> Download</button>
    </div>
  )
}

export default FileReactAdvancedCourse;
