import styles from "./About.module.css";

const About = () => {
  return (
    <div>
      <h2 className={styles.title}>About</h2>
      <div>
        <h3 className={styles.subtitleAbout}>Professional Experience</h3>
        <div className={styles.aboutText}> 
          <li>
            Internship at TJES: Worked as an intern for the government agency of 
            the state of Espírito Santo, Brazil, called TJES - Tribunal de Justiça 
            do Estado do Espírito Santo. Responsibilities included executing 
            scripts in Oracle SQL and starting to study Bootstrap, HTML, and CSS. 
            Unfortunately, as TJES could only hire through public competitions, 
            my contract ended.  
          </li>
          <li>
            Internship at Unilider: Following my time at TJES, I had another 
            internship opportunity at Unilider, a well-known food distributor 
            in Espírito Santo. My role involved managing two websites using 
            WordPress and handling administrative tasks for the company’s 
            e-commerce portals. During this time, I also completed several courses 
            in HTML, CSS, JavaScript, and SQL while attending university.  
          </li>
          <li>
            INLFOR: After graduation, I worked for four years at a large forestry 
            management company called INLFOR in the systems maintenance department.
            My tasks included correcting and analyzing bugs for a forestry 
            management system coded in C# and Vue.js, using Oracle SQL for the 
            database. Additionally, I provided support and consultancy to clients, 
            showcasing strong communication skills that fostered excellent 
            relationships with users. Bug analysis requests were managed through a 
            tool called Jira.
          </li>
        </div>
        <h3 className={styles.subtitleAbout}>Career Interests:</h3>
        <div className={styles.aboutText}>
          <li>
            I am particularly interested in pursuing a career in web development,
            especially as a front-end developer. I am eager to learn more and 
            gain experience in the field, even if it means branching out into 
            other areas of computing. I also wish to delve deeper into tools 
            such as React.js, Vue.js, and TypeScript.
          </li> 
        </div>
        <h3 className={styles.subtitleAbout}>Personal Interests:</h3>
        <div className={styles.aboutText}>
          <li>
            Outside of my professional experiences, I am passionate about anime,
            music, and sports, particularly basketball, soccer, and volleyball. 
            I enjoy a wide range of music but have a special fondness for 
            Japanese rock (J-Rock) and pop (J-Pop). I am a big fan of bands 
            like Wanima and Uverworld, as well as R&B and rap artists, including 
            Chris Brown, Backstreet Boys, Eminem, and Tupac. In my free time, 
            I watch new anime and play video games, as well as enjoy playing 
            basketball.
          </li>
        </div>
      </div>
    </div>
  )
}

export default About
