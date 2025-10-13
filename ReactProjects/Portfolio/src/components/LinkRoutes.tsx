import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Calculator from "../pages/Calculator.tsx";
import Result from "../pages/Result.tsx";
import WebThema from "./WebThema.tsx";
import Home from "../routes/Home.tsx";
import ToDoListPage from "../pages/ToDoListPage.jsx";
import Game from "../components/Game.jsx";
import Repos from "../routes/Repos.tsx";
import InventoryManager from "./InventoryManager.tsx";
import AppMiniBlog from "./AppMiniBlog.tsx";
import HomeMiniBlog from '../pages/homeMiniBlog/HomeMiniBlog.tsx';
import AboutMiniBlog from '../pages/aboutMiniBlog/AboutMiniBlog.tsx';
import LoginMiniBlog from '../pages/loginMiniBlog/LoginMiniBlog.tsx';
import RegisterMiniBlog from '../pages/registerMiniBlog/RegisterMiniBlog.tsx';
import CreatePost from '../pages/createPostMiniBlog/CreatePost.tsx';
import Dashboard from '../pages/dashboardMiniBlog/Dashboard.tsx';
import PostMiniBlog from '../pages/postMiniBlog/PostMiniBlog.tsx';
import SearchMiniBlog from '../pages/searchMiniBlog/SearchMiniBlog.tsx';
import EditPost from '../pages/editPostMiniBlog copy/EditPost.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <WebThema />,
  },
  {
    path:"/barbecuecalculator",
    element: <Calculator />, // layout
    children:[
      { path: "result", element: <Result /> },
    ]
  },
  {
    path: "/todolist",
    element: <ToDoListPage />,
  },
  {
    path: "/game",
    element: <Game />,
  },
  {
    path: "/inventorymanagerproduct",
    element: <InventoryManager />,
  },
  {
    path: "/githubfinder", element: <Home/>,
  },
  {
    path: "/githubfinder/repos/:username", element: <Repos />
  },
  {
    path:"/miniblog", element: <AppMiniBlog />, 
    children: [ 
      {path: "homeminiblog", element: <HomeMiniBlog />},
      {path: "aboutminiblog", element: <AboutMiniBlog /> },
      {path: "post/create", element: <CreatePost /> },
      {path: "post/edit/:id" , element: <EditPost />},
      {path: "post/:id", element: <PostMiniBlog /> },
      {path: "search", element: <SearchMiniBlog />},  
      {path: "login", element: <LoginMiniBlog />}, 
      {path: "register", element: <RegisterMiniBlog />}, 
      {path: "dashboard", element: <Dashboard /> },
    ]
  },
]);

const LinkRoutes = () => {
  return <RouterProvider router={router} />;

  {/** <BrowserRouter> 
    <Routes> 
      <Route path="/" element= {<WebThema />}/> 
      <Route path="/barbecuecalculator" element= {<Calculator />}/> 
      <Route path= "/result" element = {<Result />}/> 
      <Route path= "/todolist" element = {<ToDoListPage/>}/> 
      <Route path= "/game" element = {<Game/>}/> 
      <Route path= "/githubfinder" element = {<Home/>} /> 
      <Route path= "/repos/:username" element= {<Repos />}/> 
      <Route path= "/inventorymanagerproduct" element = {<InventoryManager />} />
      <Route path= "/miniblog" element = {<AppMiniBlog />} /> 
    </Routes> 
  </BrowserRouter> */}
};

export default LinkRoutes;
