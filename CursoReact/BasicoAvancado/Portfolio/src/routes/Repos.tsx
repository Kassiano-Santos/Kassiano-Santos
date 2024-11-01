import {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import { RepoProps } from "../types/repo.ts";
import Loader from '../components/Loader.tsx';
import styles from "./Repos.module.css";
import BackBtn from '../components/BackBtn.tsx';
import Repo from '../components/Repo.tsx';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid2';


const Repos = ()=> {
  const [repos,setRepos] = useState<RepoProps[] | [] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=> {
    const loadRepos = async (username: string)=> {
      setIsLoading (true);
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      const data = await response.json();

      setIsLoading(false);
      
      let orderedRepos = data.sort(
        (a: RepoProps,b: RepoProps) => b.stargazers_count - a.stargazers_count);

        orderedRepos = orderedRepos.slice(0, 5);

      setRepos(orderedRepos);      

    };
    if (username){
      loadRepos(username);
    }
},[]);

  if (!repos && isLoading) return <Loader />;
  const {username} = useParams();
  return (
    <Container maxWidth={false} sx={{height: "100%" , backgroundColor: "#0A192F"}}>
      <Grid container spacing={2}  className={styles.repos}>
        <Grid size = {{xl:12, xs: 12}}>
          <Grid size = {{xl:12, xs: 12}}>
            <Grid size= {{xl:12,xs:12}}>
              <BackBtn />
            </Grid>
            <Grid size= {{xl:12,xs:12}}>
              <h2>Explore the user repository</h2>
            </Grid>
          </Grid>
          <Grid size = {{xl:6, xs: 12}}>
            {repos && repos.length > 0 && (
              <Grid size = {{xl:12, xs:12}} className={styles.repos_conteiner}>
                {repos.map((repo: RepoProps)=> (
                  <Repo key={repo.name} {...repo} />
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
export default Repos;