import ReactCoursePT from "../assets/ReactCoursePT.pdf";
import styles from "./Certificates.module.css";

const FileReactCertificatePT = () => {
  const onReactCertificate = () => {
    const pdfHighSchool = ReactCoursePT;
    const link = document.createElement("a");
    link.href = pdfHighSchool;
    link.download = "ReactCoursePT.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <div className={styles.text}>
      <p>React Course Certificate in Portuguese:</p> 
      <button onClick={onReactCertificate} className= {styles.certificateButton}> Download</button>
    </div>
  )
}

export default FileReactCertificatePT;
