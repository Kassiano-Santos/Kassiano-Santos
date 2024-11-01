import Grid from '@mui/material/Grid2';
import styles from "./webTheme.module.css";
import ProjectList from './ProjectList';
import Certificates from './Certificates';
import About from './About.tsx';
import { Container, Link } from '@mui/material';
import Icons from './Icons.tsx';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useRef } from 'react';


const WebThema = ()=>{
  const aboutRef = useRef<HTMLDivElement | null> (null);
  const projectListRef = useRef<HTMLDivElement | null> (null);
  const certificatesRef = useRef<HTMLDivElement | null> (null);
  
  return (
    <Container maxWidth={false} sx={{height: "100%", backgroundColor: "#0a192f"}}>
      <Grid container spacing={2} className={styles.conteiner} ref= {aboutRef} >
        <Grid size={{xl: 4,sm:12,md:4, xs: 12}} >
          <Grid size={{xl: 4,sm:12, xs: 12}} className={styles.fixedGrid}>
            <Grid size={{xl: 12, xs: 12}} ref = {projectListRef}>
              <h1 className={styles.name}>Kassiano Santos</h1>
              <h2 className={styles.dev}>Junior Front-End Engineer</h2>
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
        <Grid size={{xl: 4,sm:12,md:8, xs: 12}}>
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
            <Grid size={{xl: 10,sm:8,md:8, xs: 12}} className={styles.baseboard}>
              <p>
                "This site was fully coded by me in Visual Studio Code, 
                developed using React.js, TypeScript, and Material UI. It 
                features a responsive layout and a grid system implemented with 
                Material UI. 
              </p>
              <p>
                Design inspired by <a href="https://brittanychiang.com/" target="_blank">brittanychiang.com</a>."
              </p>
            </Grid>
          </Grid>
          <Grid size={{xl: 10,sm:8,md:8, xs: 12}} className={styles.top} ref = {aboutRef}>
            <Link
              color="#d4cdcd" 
              className= {styles.links}
              component="button"
              onClick= {()=>{
                aboutRef.current?.scrollIntoView({
                  behavior: 'smooth'}
              )
            }}
            >
             <ArrowUpwardIcon sx={{fontSize:"50px"}}/>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default WebThema;