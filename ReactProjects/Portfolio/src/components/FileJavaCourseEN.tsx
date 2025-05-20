import JavaCourseEN from "../assets/JavaCourseEN.pdf";
import styles from "./Certificates.module.css";

const FileJavaCourseEN = () => {
  const onReactCertificate = () => {
    const pdfHighSchool = JavaCourseEN;
    const link = document.createElement("a");
    link.href = pdfHighSchool;
    link.download = "JavaCourseEN.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
return (
  <div className={styles.text}>
    <p>Certificate Java/Spring Boot Course in English:</p> 
    <button onClick={onReactCertificate} className= {styles.certificateButton}> Download</button>
  </div>
)
}
export default FileJavaCourseEN;
