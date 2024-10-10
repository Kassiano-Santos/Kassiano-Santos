import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calculator from './pages/Calculator.tsx';
import Result from './pages/Result.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Calculator />} />
        <Route path= "/result" element = {<Result />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
