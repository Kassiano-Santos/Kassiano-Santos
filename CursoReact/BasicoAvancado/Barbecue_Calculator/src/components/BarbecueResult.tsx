import { useLocation, useNavigate } from "react-router-dom";
import {Food, foodName, quantityPersons} from "../types/Food.ts"
import { BarbecueResultType } from '../types/BarbecueResultType';
import styles from "./BarbecueResult.module.css";

const BarbecueResult = ()=> {

  const location = useLocation();
  const navigate = useNavigate();

  // Alias ​​is just another way to "typer" the constant
  const state = location.state as BarbecueResultType;

  const restart = ()=> {
    navigate("/");
  };

  const totalPerFood = state.foodSelected.reduce(
    (acc, food) => {
      acc[food] = (quantityPersons[food] * state.persons) / 1000;
      return acc;
    }, 
    {} as Record<Food, number>
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Result for {state.persons} persons.</h2> 
      {state.foodSelected.map((food) => (
        <p key= {food} className={styles.resultText}>{foodName[food]}: {totalPerFood[food]} kg</p>
      ))}
      <button onClick={restart} className={styles.resetButton}>Restart</button>
    </div>
  )
}
export default BarbecueResult;