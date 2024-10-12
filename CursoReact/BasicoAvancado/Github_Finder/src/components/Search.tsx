import { BsSearch } from 'react-icons/bs';
import { useState, KeyboardEvent } from 'react';
import styles from "./Search.module.css";

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
    <div className={styles.search}>
      <h2>Search Users</h2>
      <p>Discover your best projects</p>
      <div className={styles.search_conteiner}>
        <input 
        type="text" 
        placeholder="Enter username"
        onChange={(e)=> setUserName(e.target.value)}
        onKeyDown={handleKeyDown}
        />
        <button onClick={()=> loadUser(userName)}>
          <BsSearch />
        </button>
      </div>
    </div>
  )
}
export default Search;