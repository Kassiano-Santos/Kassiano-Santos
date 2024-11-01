import { MdLocationPin } from 'react-icons/md';
import { UserProps } from "../types/user";
import { useNavigate } from 'react-router-dom';
import styles from "./User.module.css";
import { Alert, Link } from '@mui/material';

const User = ({
  login,
  avatar_url,
  followers,
  following,
  location,
  public_repos
}: UserProps)=> {
  const navigate = useNavigate();
  const handleRepos = ()=>{
    if(public_repos ===  0 ){
      alert("Can't found a repository for this user")
    }
  }
    return (
      <div className={styles.user}>
        <img src= {avatar_url} alt={login}/>
        <h2 className={styles.text}>{login}</h2>
        {location && (
          <p className={styles.location}>
          <MdLocationPin />
          <span>{location}</span>
        </p>
        )}
        <div className={styles.stats}>
          <div className={styles.text}>
            <p>Followes:</p>
            <p className={styles.number}>{followers}</p>
          </div>
          <div className={styles.text}>
            <p>Following:</p>
            <p className={styles.number}>{following}</p>
          </div>
        </div>
        <div>
        <Link 
          className={styles.projectButton}
          onClick={()=>{ public_repos === 0 ? handleRepos()
            : navigate(`/repos/${login}`)}
          }>See the Best Project
        </Link>
        </div>
      </div>
    )


}
export default User;