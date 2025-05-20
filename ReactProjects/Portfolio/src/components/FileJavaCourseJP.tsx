import JavaCourseJP from "../assets/JavaCourseJP.pdf";
import styles from "./Certificates.module.css";

const FileJavaCourseJP = () => {
  const onReactCertificate = () => {
    const pdfHighSchool = JavaCourseJP;
    const link = document.createElement("a");
    link.href = pdfHighSchool;
    link.download = "JavaCourseJP.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
return (
  <div className={styles.text}>
    <p>Certificate Java/Spring Boot Course in Japanese:</p> 
    <button onClick={onReactCertificate} className= {styles.certificateButton}> Download</button>
  </div>
)
}
export default FileJavaCourseJP;
