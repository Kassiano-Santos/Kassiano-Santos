import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calculator from '../pages/Calculator.tsx';
import Result from '../pages/Result.tsx';
import WebThema from "./WebThema.tsx";
import Home from '../routes/Home.tsx';
//import ToDoListPage from '../pages/ToDoListPage.jsx';
//import Game from '../components/Game.jsx';
import Repos from '../routes/Repos.tsx';

const LinkRoutes = () => {
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element= {<WebThema />}/>
            <Route path="/barbecuecalculator" element= {<Calculator />}/>
            <Route path= "/result" element = {<Result />}/>
            {/*
            <Route path= "/todolist" element = {<ToDoListPage/>}/>
            <Route path= "/game" element = {<Game/>}/>
            */}
            <Route path= "/githubfinder" element = {<Home/>} />
            <Route path= "/repos/:username" element= {<Repos />}/>
          </Routes>
        </BrowserRouter>
  )
}

export default LinkRoutes;
