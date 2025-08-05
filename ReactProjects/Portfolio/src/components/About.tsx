import styles from "./About.module.css";

const About = () => {
  return (
    <div>
      <h2 className={styles.title}>About</h2>
      <div>
        <h2 className={styles.subtitleAbout}>Professional Experience</h2>
        <div className={styles.aboutText}> 
          <ul>
            <h4>Exchange Program in Japan</h4>
           <li>
            Development of a responsive personal portfolio website using 
            React.js and TypeScript, and Java with Spring Boot, hosted on 
            Vercel.
          </li> 
          <li>
            Creation of front-end projects using React.js, forms with Formik + 
            Yup, state management, HTTP requests, and integration with REST 
            APIs.
          </li>
           <li>
            Development of back-end projects with Java, using Spring Boot and JavaFX, 
      including an API hosted on Render with public and private routes.
           </li>
           <li>
            Application of best practices such as layered architecture (MVC), 
      version control with Git, and consumption of RESTful APIs.
           </li>
           <li>Duration: Since May 2024 to present.</li>
          </ul>
          <ul>
            <h4>INLFOR, Software Developer / Customer Success Analyst:</h4>
            <li>Worked on maintenance and enhancement of corporate systems.</li>
            <li>Bug fixing and debugging (front-end and back-end).</li>
            <li>Development of SQL scripts (Oracle) to handle production issues.</li>
            <li>Technical support for end users.</li>
            <li>Technologies: C#, Oracle SQL, Vue.js.</li>
            <li>Duration: 4 years.</li>
          </ul>
          <ul>
            <h3>Additional Experience</h3>
            <h4>Front-End Development Intern – Unilider (Serra/ES)</h4>
            <li>
                Managed three company websites (a corporate site in WordPress and 
                two e-commerce sites in PHP).
            </li>
            <li>Duration: Jan 2018 - Dec 2019</li>
          </ul>
          <ul>
            <h4>Technical Support Intern – TJES (Vitória/ES)</h4>
            <li>
                Assisted public servants, generated and sent reports, and 
                created scripts and queries for Oracle database.
            </li>
            <li>Duration: Jul 2016 - Dec 2017</li>
          </ul>
          <ul>
            <h4>Technical Support Intern – Banestes (Vitória/ES)</h4>
            <li>
                Provided support for banking system users and guidance on 
                application usage.
            </li>
            <li>Duration: Jun 2014 - Jun 2016</li>
          </ul>
          <ul>
            <h4>Diverse Experiences in Japan (Apr 2023 – Jun 2025)</h4>
            <li>
              Worked as a production assistant at Yamahiro factory and as a 
              kitchen helper at Donsantei restaurant, performing food 
              preparation, customer service, and cleaning tasks. These 
              experiences strengthened my discipline, teamwork, and resilience
              in a multicultural environment.
            </li>
          </ul>
        </div>
        <h2 className={styles.subtitleAbout}>Career Interests</h2>
        <div className={styles.aboutText}>
            <p>
              I am particularly aiming to become a full-stack developer, and 
              to achieve this goal, I have been studying both front-end and 
              back-end technologies. Currently, I am focusing on improving my 
              front-end skills using React.js and TypeScript. I also have 
              experience with Vue.js and remain open to learning new 
              technologies.
              Additionally, I am open to back-end opportunities, as I believe
              that hands-on experience will contribute significantly to my 
              growth. I chose to start with Java, as it was the language I 
              studied during university, and I also have some experience with 
              C#/.NET.              
            </p> 
        </div>
        <h2 className={styles.subtitleAbout}>Personal Interests</h2>
        <div className={styles.aboutText}>
            <p>
              Outside of my professional experiences, I am passionate about anime,
              music, and sports, particularly basketball, soccer, and volleyball. 
              I enjoy a wide range of music but have a special fondness for 
              Japanese rock (J-Rock) and pop (J-Pop). I am a big fan of bands 
              like Wanima and Uverworld, as well as R&B and rap artists, including 
              Chris Brown, Backstreet Boys, Eminem, and Tupac. In my free time, 
              I watch new anime and play video games, as well as enjoy playing 
              basketball.
            </p>
        </div>
      </div>
    </div>
  )
}

export default About
