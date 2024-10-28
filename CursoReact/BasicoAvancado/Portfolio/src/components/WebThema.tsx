import Grid from '@mui/material/Grid2';
import styles from "./webTheme.module.css";
import ProjectList from './ProjectList';
import Certificates from './Certificates';
import About from './About.tsx';
import { Container, Link } from '@mui/material';
import Icons from './Icons.tsx';
import { useRef } from 'react';


const WebThema = ()=>{
  const aboutRef = useRef<HTMLDivElement | null> (null);
  const projectListRef = useRef<HTMLDivElement | null> (null);
  const certificatesRef = useRef<HTMLDivElement | null> (null);
  
  return (
    <Container maxWidth={false} sx={{height: "100%", backgroundColor: "#0a192f"}}>
      <Grid container spacing={2} className={styles.conteiner} ref= {aboutRef} >
        <Grid size={{xl: 4, xs: 12}} >
          <Grid size={{xl: 4, xs: 12}} className={styles.fixedGrid}>
            <Grid size={{xl: 12, xs: 12}} ref = {projectListRef}>
              <h1 className={styles.name}>Kassiano Santos</h1>
              <h2 className={styles.dev}>Junior Front End Engineer </h2>
            </Grid>
            <Grid size= {{xl: 4, xs: 12}} >
              <Grid className= {styles.linkItem}>
                <Link 
                  color="#d4cdcd" 
                  underline="none"
                  className= {styles.links}
                  component="button"
                  rel="noopener"
                  onClick={()=> {
                    aboutRef.current?.scrollIntoView({
                      behavior: 'smooth'
                      
                    })
                  }}
                >
                ABOUT
                </Link>
              </Grid>
              <Grid className= {styles.linkItem}>
                <Link
                  color="#d4cdcd" 
                  underline="none"
                  className= {styles.links}
                  component="button"
                  onClick={()=> {
                    projectListRef.current?.scrollIntoView({
                      behavior: 'smooth'
                    })
                  }}
                >
                  PROJECT LIST
                </Link>
              </Grid>
              <Grid className= {styles.linkItem}>
                <Link
                  color="#d4cdcd" 
                  underline="none"
                  className= {styles.links}
                  component="button"
                  onClick={()=> {
                    certificatesRef.current?.scrollIntoView({
                      behavior: 'smooth'
                    })
                  }}
                >
                  CERTIFICATES
                </Link>
              </Grid>
            </Grid>
            <Grid size= {{xl: 12, xs: 12}} className= {styles.icons} >
              <Icons />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{xl: 4, xs: 12}}>
          <Grid size={{xl: 12, xs: 12}}>
            <Grid size={{xl: 12, xs: 12}}>
              <About />
            </Grid>
            <Grid size={{xl: 12, xs: 12}} ref = {projectListRef}>
              <ProjectList />
            </Grid>
            <Grid size={{xl: 12, xs: 12}} ref = {certificatesRef}>
              <Certificates />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default WebThema;