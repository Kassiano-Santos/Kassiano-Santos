import BarbecueResult from '../components/BarbecueResult';
import bgImage from "../assets/bg-2.jpg";

const Result = ()=> {
  return (
    <div style = {{backgroundImage: `url(${bgImage})`}} className="page-conteiner">
      <h1 className="title">Barbecue Result</h1>
      <BarbecueResult />
    </div>
  );
};
export default Result;