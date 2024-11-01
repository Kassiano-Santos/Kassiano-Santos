import { RepoProps } from "../types/repo.ts";
import { BsCodeSlash } from 'react-icons/bs';
import { AiOutlineStar, AiOutlineFork } from 'react-icons/ai';
import { RiGitRepositoryLine } from 'react-icons/ri';
import styles from "./repo.module.css";
import Grid from '@mui/material/Grid2';
import { Container, Link } from '@mui/material';

const Repo = ({
  name,
  language,
  html_url,
  forks_count,
  stargazers_count,
}: RepoProps)=> {
  return (
  <Container>
    <Grid size = {{xl: 8,xs: 12}} container spacing={2} className={styles.repo}>
      <Grid size= {{xl:12, xs:12}}>
        <h3>{name}</h3>
      </Grid>
      <Grid size= {{xl:6, xs:12}}>
          <p>
            <BsCodeSlash />
            {language}
          </p>
      </Grid>
      <Grid size={{xl:12, xs:12}} className={styles.stats}>
          <AiOutlineStar />
          <span>{stargazers_count}</span>
          <AiOutlineFork />
          <span>{forks_count}</span>
      </Grid>
      <Grid className={styles.repo_btn}>
        <Link 
          href={html_url} 
          target= "_blank" 
          sx= {{color: "#fff", textDecoration:"none", marginRight: "5px"}} 
        > 
          See Code
        </Link>
        <Link
          href={html_url} 
          target= "_blank" 
          sx= {{color: "#fff", textDecoration:"none", marginRight: "5px"}} 
        >
        <RiGitRepositoryLine fontSize={20}/>
        </Link>
      </Grid>
    </Grid>
  </Container>
  )
}
export default Repo;