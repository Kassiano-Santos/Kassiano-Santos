import Grid from '@mui/material/Grid2';
import styles from "./webTheme.module.css";
import ProjectList from './ProjectList';
import Certificates from './Certificates';
import About from './About.tsx';
import { CssBaseline, Link } from '@mui/material';
import Icons from './Icons.tsx';
import { useRef } from 'react';

const WebThema = ()=>{
  const aboutRef = useRef<HTMLDivElement | null> (null);
  const projectListRef = useRef<HTMLDivElement | null> (null);
  const certificatesRef = useRef<HTMLDivElement | null> (null);

  
  return (
    <>
      <CssBaseline />
      <Grid container spacing={2} className={styles.conteiner} ref= {aboutRef}>
        <Grid size={{xl: 4, xs: 12}} >
          <Grid size={{xl: 4, xs: 12}} className={styles.fixedGrid}>
            <Grid size={{xl: 12, xs: 12}} >
              <h1 className={styles.name}>Kassiano Santos</h1>
              <h2 className={styles.dev}>Dev. Junior</h2>
            </Grid>
            <Grid size= {{xl: 4, xs: 12}} className= {styles.links}>
              <Grid>
                <Link 
                  color="inherit" 
                  underline="hover"
                  component="button"
                  onClick={()=> {
                    aboutRef.current?.scrollIntoView({
                      behavior: 'smooth'
                    })
                  }}
                >
                About
                </Link>
              </Grid>
              <Grid>
                <Link
                  color="inherit" 
                  underline="hover"
                  component="button"
                  onClick={()=> {
                    projectListRef.current?.scrollIntoView({
                      behavior: 'smooth'
                    })
                  }}
                >
                  Project List
                </Link>
              </Grid>
              <Grid>
                <Link
                  color="inherit" 
                  underline="hover"
                  component="button"
                  onClick={()=> {
                    certificatesRef.current?.scrollIntoView({
                      behavior: 'smooth'
                    })
                  }}
                >
                  Certificates
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
    </>
  )
}

export default WebThema;