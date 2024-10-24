import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WebThema from "./components/WebThema.tsx";
import Calculator from './pages/Calculator.tsx';
import Result from './pages/Result.tsx';

function App() {
  return (
    //070750
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element= {<WebThema />}/>
            <Route path="/barbecuecalculator" element= {<Calculator />}/>
            <Route path= "/result" element = {<Result />}/>
          </Routes>
        </BrowserRouter>
      </div>
  )
}
export default App;


