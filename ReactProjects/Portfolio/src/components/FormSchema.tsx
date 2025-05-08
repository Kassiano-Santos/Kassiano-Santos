import * as yup from "yup";

export const FormSchema = 
  yup.object({
    id: yup
      .number()
      .typeError("ID must be a number.")
      .required("Enter an ID or select a product from the Product List."),
    prouctName: yup
      .string()
      .required("Product Name is required."),
    price: yup
      .number()
      .typeError("Price must be a number.")
      .required("Price is required"),
    quantity: yup
      .number()
      .typeError("Quantity must be a number")
      .required("Quantity is required"),
    status: yup.string().required("Status is required")
  });