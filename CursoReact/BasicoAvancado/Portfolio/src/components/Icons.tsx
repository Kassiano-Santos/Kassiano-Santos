import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import styles from './Icons.module.css'
import { Link } from '@mui/material';

const Icons = () => {
  return (
    <div>
      <Link color="inherit" 
      href="https://github.com/Kassiano-Santos/"
      target="_blank"
      >
        <GitHubIcon 
          sx={{ fontSize: 35, mr:2, ml:2, alt: "ypo" }} 
          className={styles.icons}
        />
      </Link>
      <Link color="inherit" 
      href="https://www.instagram.com/kassianosantosm/"
      target="_blank"
      >
        <InstagramIcon 
          sx={{ fontSize: 35, mr:2, ml:2  }} 
          className={styles.icons}
        />
      </Link>
      <Link color="inherit" 
      href="https://www.linkedin.com/in/kassiano-santos-47778015a/"
      target="_blank"
      >
        <LinkedInIcon 
          sx={{ fontSize: 35, mr:2, ml:2 }} 
          className={styles.icons}
        />
      </Link>
    </div>
  )
}

export default Icons
