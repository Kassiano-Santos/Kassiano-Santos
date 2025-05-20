import JavaCoursePT from "../assets/JavaCoursePT.pdf";
import styles from "./Certificates.module.css";

const FileJavaCoursePT = () => {
  const onReactCertificate = () => {
    const pdfHighSchool = JavaCoursePT;
    const link = document.createElement("a");
    link.href = pdfHighSchool;
    link.download = "JavaCoursePT.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
return (
  <div className={styles.text}>
    <p>Certificate Java/Spring Boot Course in Portuguese:</p> 
    <button onClick={onReactCertificate} className= {styles.certificateButton}> Download</button>
  </div>
)
}
export default FileJavaCoursePT;
