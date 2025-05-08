export type Food = "meat" | "sausage" | "chiken" | "garlicBread";
/* 
 Record allows you to "typer" in an object using the key and value
(food type key and numeric value)
*/
export const quantityPersons : Record<Food,number> = {
  meat: 400,
  sausage: 200,
  chiken: 200,
  garlicBread: 100
}
// It will be called on the front end for the end user to read.
export const foodName: Record<string,string> = {
  meat: "Meat",
  sausage: "Sausage",
  chiken: "Chiken",
  garlicBread: "Garlic Bread"
};
