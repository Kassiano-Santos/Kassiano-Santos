import Search from '../components/Search.tsx';
import { useState } from 'react';
import { UserProps } from '../types/user';
import User from "../components/User.tsx";
import Loader from '../components/Loader.tsx';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import styles from "./Home.module.css"

const Home = ()=> {
  const [user, setUser] = useState<UserProps | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState (false);

  const loadUser = async(userName: string)=>{
    setIsLoading(true);
    setError(false);
    setUser(null);

    const response = await fetch(`http://api.github.com/users/${userName}`);
    
    const data = await response.json();

    setIsLoading(false);

    if(response.status === 404 ) {
      error;
      setError(true);
    }
    
    const {avatar_url, login, location, followers, following, public_repos} = data;
    
    const userData: UserProps = {
      avatar_url,
      login,
      location,
      followers,
      following,
      public_repos
    };
    setUser(userData);
  };

  return (
    <Container maxWidth= {false} sx={{height: "100%",  backgroundColor: "#0a192f"}}
    className={styles.containerItem}
    >
      <Grid size = {{xl: 10, xs:12}}>
        <Grid container spacing={2} >
          <Grid size= {{xl:10}}>
            <h1 className={styles.title}>GitHub Finder</h1>
          </Grid>
          <Grid size= {{xl:4, xs:12}} >
            <Search loadUser={loadUser}/>
          </Grid>
          <Grid size= {{xl:4, xs:12}} className= {styles.userGrid}>
          {user && <User {...user}/>}
          </Grid>
          {isLoading && <Loader />}
        </Grid>
      </Grid>
    </Container>
  )
}
export default Home;