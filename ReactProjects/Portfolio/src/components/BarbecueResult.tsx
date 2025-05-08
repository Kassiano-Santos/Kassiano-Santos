import { useLocation, useNavigate } from "react-router-dom";
import {Food, foodName, quantityPersons} from "../types/Food.ts";
import { BarbecueResultType } from '../types/BarbecueResultType.ts';
import styles from "./BarbecueResult.module.css";
import  Grid from '@mui/material/Grid2';

const BarbecueResult = ()=> {

  const location = useLocation();
  const navigate = useNavigate();

  // Alias ​​is just another way to "typer" the constant
  const state = location.state as BarbecueResultType;

  const restart = ()=> {
    navigate("/barbecuecalculator");
  };
  const home = ()=> {
    navigate("/");
  }

  const totalPerFood = state.foodSelected.reduce(
    (acc, food) => {
      acc[food] = (quantityPersons[food] * state.persons) / 1000;
      return acc;
    }, 
    {} as Record<Food, number>
  );

  return (
      <Grid className={styles.containerItem}>
        <Grid className= {styles.box}>
          <h2 className={styles.title}>Result for {state.persons} persons.</h2> 
          {state.foodSelected.map((food) => (
            <p key= {food} className={styles.resultText}>{foodName[food]}: {totalPerFood[food]} kg</p>
          ))}
        </Grid>
        <Grid>
            <button onClick={home} className={styles.resetButton}>Home</button>
            <button onClick={restart} className={styles.resetButton}>Restart</button>
        </Grid>
      </Grid>
  )
}
export default BarbecueResult;