import BarbecueCalculator from '../components/BarbecueCalculator';
import bgImage from "../assets/bg-1.jpg";
const Calculator = ()=> {
  return (
    <div 
    className="page-conteiner" 
    style={{backgroundImage: `url(${bgImage})`}}>
      <h1 className="title">Babecue Calculator</h1>
      <BarbecueCalculator />
    </div>
  );
};
export default Calculator;