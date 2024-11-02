import { useState, KeyboardEvent } from 'react';
import styles from "./Search.module.css";
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid2';
import { Container, Link } from '@mui/material';
import { Height } from '@mui/icons-material';

type SearchProps = {
  loadUser: (userName:string)=> Promise<void>;
}

const Search = ({loadUser}: SearchProps)=> {
  const [userName, setUserName] = useState("");

  const handleKeyDown = (e: KeyboardEvent)=> {
    if(e.key==="Enter"){
      loadUser(userName);

    }
  }

  return (
    <Container maxWidth={false} sx={{Height: "100%", backgroundColor: "#0a192f"}}>
        <Grid className={styles.search} container spacing={2}>
          <Grid className={styles.text}>
            <h2>Search Users</h2>
            <p>Discover your best projects</p>
          </Grid>
          <Grid className={styles.search_conteiner}>
            <Grid>
              <input 
              type="text" 
              placeholder="Enter username"
              onChange={(e)=> setUserName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            </Grid>
            <Grid>
              <Link onClick={()=> loadUser(userName)} >
                <SearchIcon className={styles.icon} sx={{ fontSize: 35 }}/>
              </Link>
            </Grid>
          </Grid>
          
        </Grid>
        <Grid className= {styles.baseboardSearch}>
          </Grid>
    </Container>
  )
}
export default Search;