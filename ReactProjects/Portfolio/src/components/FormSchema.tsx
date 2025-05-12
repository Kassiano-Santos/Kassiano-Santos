import * as yup from "yup";

export const FormSchemaAdd = 
  yup.object({
    productName: yup
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
    status: yup
      .string()
      .required("Status is required")
  });

export const FormSchemaUpdateRemove = 
  yup.object({
    id: yup
      .string()
      .typeError("ID must be a number")
      .required("ID is required")
  });

export const FormSchemaLoadFilds =
  yup.object({
    id:yup
      .string()
      .required("Enter an id or select a line from the product list")
  });
export type FormValues = {
  id: string;
  productName: string;
  price: string;
  quantity: string;
  status: string;
};
export const initialValues: FormValues = {
  id: '',
  productName: '',
  price: '',
  quantity: '',
  status: '',
};

export const onSubmit = (values: typeof initialValues) => {
  console.log('Valores enviados:', values);
};