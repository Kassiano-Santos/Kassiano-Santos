import { useNavigate } from 'react-router-dom';
import { foodName } from '../types/Food';
import { Formik, Field,Form } from 'formik';
import * as Yup from "yup";
import styles from "./BarbecueCalculator.module.css";
import  Grid from '@mui/material/Grid2';

/*
  Formik is a form library to manage passed values. 
  Yup is a validation library
*/
const validationScheme = Yup.object().shape({
  persons: Yup.number()
  .min(1, "Number of people is mandatory"),
  foodSelected: Yup.array()
  .of(Yup.string())
  /*
    The test function allows you to perform a customized validation, the first 
    parameter is the name of the validation, the second would be the error 
    message, and finally the function that will be executed within aaray.
  */
  .test(
    "check-foodSelected",
    "Select at least one food",
    (array) => array != null && array!.length > 0
  ),
});

const BarbecueCalculator = ()=> {
  const navigate = useNavigate(); 
  return (
    <Grid size = {{xl:12, sm:12}} className={styles.containerItem}>
      {/*/The initial state will not be defined by useState but in the form*/}
      <h1 className={styles.barbecueTitle}>Barbecue Calculator</h1>
      <Formik 
        initialValues={{persons:0, foodSelected: []}} 
        validationSchema={validationScheme}
        onSubmit={(values) => {
          navigate("/result", {
            state: {
              persons: values.persons,
              foodSelected: values.foodSelected,
            }
          });
        }}>
       {({ errors, touched }) => (
         <Form>
          <div className={styles.inputGroup}>
            <label htmlFor="persons" className={styles.inputLabel}>Quantity Person</label>
            <Field name="persons" type="number" min="0" className= {styles.inputField}/>
            {errors.persons && touched.persons ? (
              <p className={styles.error}>{errors.persons}</p>
            ) : null}
          </div>
          <h2 className={styles.text}>Select the food for Barbecue:</h2>
          {Object.keys(foodName).map((food) => (
           <div key= {food}>
              <label className={styles.text}>
                <Field 
                  type= "checkbox"
                  name= "foodSelected" 
                  value= {food}
                  className={styles.checkboxInput}
                />
                {foodName[food]}
              </label>
           </div>
         ))}
         {errors.foodSelected ? (
              <div className={styles.error}>{errors.foodSelected}</div>
             ) : null}
         <button type="submit" className={styles.calculateButton}>Calculate</button>
       </Form>
       )}
      </Formik>
    </Grid>
  );
};
export default BarbecueCalculator;