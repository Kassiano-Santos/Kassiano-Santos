import { Dialog, IconButton } from "@mui/material";
import styles from './JavaProjectList.module.css';
import  Grid from '@mui/material/Grid2';
import { useState } from "react";
import { PlayCircle } from "lucide-react";

export function ProductInventoryVideo() {
  const [open, setOpen] = useState(false);

  return (
    <Grid>
      <IconButton onClick={() => setOpen(true)}
      className={styles.LinkJavaProjects}
      sx={{color: "#5dcfa7", fontWeight: "normal", fontSize:20}}
      >
        <PlayCircle className={styles.icon} /> See a Video Demo
      </IconButton>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="xl" 
        >
          <video width="100%" height="670" controls style={{color: "red"}}>
            <source 
              type="video/mp4" 
              src="https://res.cloudinary.com/dtqvzimvv/video/upload/v1747107288/ProductInventoryManager.mp4" 
            />
            Your browser does not support the video.
          </video>
      </Dialog>
    </Grid>
  );
}

export function ClimatesInformationVideo() {
  const [open, setOpen] = useState(false);

  return (
    <Grid>
      <IconButton onClick={() => setOpen(true)}
      className={styles.LinkJavaProjects}
      sx={{color: "#5dcfa7", fontWeight: "normal", fontSize:20}}
      >
        <PlayCircle className={styles.icon} /> See a Video Demo
      </IconButton>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="xl" 
        >
          <video width="100%" height="670" controls style={{color: "red"}}>
            <source 
              type="video/mp4" 
              src="https://res.cloudinary.com/dtqvzimvv/video/upload/v1747107284/ClimateInformation.mp4" 
            />
            Your browser does not support the video.
          </video>
      </Dialog>
    </Grid>
  );
}

export function ShoppingListVideo() {
  const [open, setOpen] = useState(false);

  return (
    <Grid>
      <IconButton onClick={() => setOpen(true)}
      className={styles.LinkJavaProjects}
      sx={{color: "#5dcfa7", fontWeight: "normal", fontSize:20}}
      >
        <PlayCircle className={styles.icon} /> See a Video Demo
      </IconButton>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="xl" 
        >
          <video width="100%" height="670" controls style={{color: "red"}}>
            <source 
              type="video/mp4" 
              src="https://res.cloudinary.com/dtqvzimvv/video/upload/v1747107280/ShoppingList.mp4" 
            />
            Your browser does not support the video.
          </video>
      </Dialog>
    </Grid>
  );
}