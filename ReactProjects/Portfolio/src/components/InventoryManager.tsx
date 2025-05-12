import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from "./InventoryManager.module.css";
import {Product} from "../types/Product";
import  Grid from '@mui/material/Grid2';
import { DataGrid, GridColDef,GridRowSelectionModel  } from '@mui/x-data-grid';
import { Card, CardContent, Typography } from '@mui/material';
import * as yup from "yup";
import { Formik } from 'formik';
import { FormSchemaAdd, FormSchemaUpdateRemove, FormSchemaLoadFilds, 
         initialValues, onSubmit,FormValues } from "./FormSchema.tsx";
import axios from 'axios';


const InventoryManager = () => {
  const BASE_URL = 'https://kassiano-santos.onrender.com/inventorymanagerproduct';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedId, setSelectedId] = useState<GridRowSelectionModel>({ type: 'include', ids: new Set()});

  const  listAll = async()=> {
    const response = await axios.get(BASE_URL); 
    const products: Product[] = response.data;
    setProducts(products);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if(products.length === 0){
        listAll();
      }
    }, 5000);
    if(products.length > 0){
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  },[products]);

  const columns : GridColDef[] = [
    { 
      field:'id', 
      headerName:'ID', 
      width: 90, 
      headerClassName: 'headerField' 
    },
    { 
      field: 'productName', 
      headerName: 'Product Name', 
      width: 200, 
      headerClassName: 'headerField' 
    },
    { 
      field: 'price', 
      headerName: 'Price $', 
      width: 110, 
      headerClassName: 'headerField',
      valueFormatter: (params) => `$ ${params}`
    },
    { 
      field: 'quantity', 
      headerName: 'Quantity', 
      width: 130, 
      headerClassName: 'headerField' 
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120, 
      headerClassName: 'headerField' 
    }
  ];

  type RenderInputProps = {
    label: string;
    name: keyof FormValues;
    values: FormValues;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors: { [key: string]: string };
  };

  const renderInput = (
    { label, name, values, handleChange, errors }: RenderInputProps) => (
    <Grid container spacing={2} className={styles[name]}>
      <Grid size="auto">
        <label>{label}</label>
      </Grid>
      <Grid size="auto">
        <input
          type="text"
          name={name}
          value={values[name]}
          onChange={handleChange}
          style={{
            borderColor: errors[name] ? "red" : undefined,
            borderWidth: errors[name] ? 2 : undefined,
          }}
        />
        {errors[name] && (
          <p className= {styles.errors}>{errors[name]}</p>
        )}
      </Grid>
    </Grid>
  );
  const runValidationAndSubmit = async (
    formSchema: yup.ObjectSchema<any>, 
    formValues: FormValues, 
    action: () => void,
    formikSetErrors: (errors: { [key: string]: string }) => void
  ) => {
  try {
    await formSchema.validate(formValues, { abortEarly: false });
    formikSetErrors ({});
    action();
  } catch (err: unknown) {
    if (err instanceof yup.ValidationError) {
      const newErrors: { [key: string]: string } = {};
      err.inner.forEach((error) => {
        if (error.path) newErrors[error.path] = error.message;
      });
      formikSetErrors(newErrors);
    } else {
      console.error("Erro inesperado:", err);
    }
  }
};
return (
  <Formik 
    initialValues={initialValues}
    onSubmit={onSubmit}
  >
  {({ values, handleChange, errors,setErrors,setValues, resetForm }) => {
      const loadFields = async (values: FormValues) => {
        await new Promise((resolve) => setTimeout(resolve, 0));
        let id: number | null = Number(values.id);

          if(isNaN(id) || id === 0 || values.id === ""){
            id = Array.from(selectedId.ids)[0] as number;
          } else if(values.id !== "" && selectedId.ids.size > 0){
            id = Array.from(selectedId.ids)[0] as number;
          }
        const correctedValues = { ...values, id: id?.toString() ?? "" };

        runValidationAndSubmit(
          FormSchemaLoadFilds, correctedValues, async () => {
          if(id){
            fetch(`${BASE_URL}/${id}`)
            .then(response => response.json())
            .then(product => {
              setValues({
              id: product.id,
              productName: product.productName,
              price: product.price,
              quantity: product.quantity,
              status: product.status  
              })
            });
          }		
        },setErrors)
      };

      const clearFields = () => {
        resetForm();
      };
      
      const add = async (values: FormValues)=> {
        await new Promise((resolve) => setTimeout(resolve, 0));

        runValidationAndSubmit(FormSchemaAdd, values, async () => {
          try {
            await axios.post(BASE_URL,values, {
              headers: {'Content-Type': 'application/json'}
            });
            listAll();
            clearFields();
          } catch (error: any) {
            setErrors(error);
          }
        },setErrors)
      };
          
      const update = async (values: FormValues)=> {
        await new Promise((resolve) => setTimeout(resolve, 0));
        let id: number | null = Number(values.id);

          if(isNaN(id) || id === 0 || values.id === "") {
            id = Array.from(selectedId.ids)[0] as number;
          } else if(values.id !== "" && selectedId.ids.size > 0){
            id = Array.from(selectedId.ids)[0] as number;
          }
          if (!id || isNaN(id)) {
            setErrors({ id: "É necessário informar um ID ou selecionar uma linha." });
            return;
          }
          const valuesToValidate: FormValues = {
            ...values,
            id: String(id) ?? "", 
          };

        runValidationAndSubmit(FormSchemaUpdateRemove,valuesToValidate, async () => {
          if(id){
            try{
              await axios.put(`${BASE_URL}/${id}`, values, {
                headers: { 'Content-Type': 'application/json'}
              });
              listAll(); 
            }catch(error: any) {
              setErrors(error);
            }
          }
        },setErrors)
      }

      const remove = async (values: FormValues)=> {
        await new Promise((resolve) => setTimeout(resolve, 0));
        let id: number | null = Number(values.id);

          if(isNaN(id) || id === 0 || values.id === ""){
            id = Array.from(selectedId.ids)[0] as number;
          } 
          else if(values.id !== "" && selectedId.ids.size > 0){
            id = Array.from(selectedId.ids)[0] as number;
          } 
          if (!id || isNaN(id)) {
            setErrors({ id: "É necessário informar um ID ou selecionar uma linha." });
            return;
          }
          const valuesToValidate: FormValues = {
            ...values,
            id: String(id) ?? "", 
          };
          
        runValidationAndSubmit(FormSchemaUpdateRemove,valuesToValidate, async () => {
          if(id){
            try {
              await axios.delete(`${BASE_URL}/${id}`);
              listAll();
              clearFields();
            } catch (error: any) {
              setErrors(error)
            }
          }
        },setErrors)
      }
      const isLoading = products.length === 0;

      return (
        <div className = {styles.container}>
          <h1 className={styles.title}>Inventory Manager Product</h1>
            <form className={styles.container}>
              {renderInput({ label: "ID:", 
                             name: "id", 
                             values, 
                             handleChange, 
                             errors 
                          })}
              {renderInput({ label: "Product Name:", 
                             name: "productName", 
                             values, 
                             handleChange, 
                             errors 
                          })}
              {renderInput({ label: "Price:", 
                             name: "price", 
                             values, 
                             handleChange, 
                             errors 
                          })}
              {renderInput({ label: "Quantity:", 
                             name: "quantity", 
                             values, 
                             handleChange, 
                             errors 
                          })}
              {renderInput({ label: "Status:", 
                             name: "status", 
                             values, 
                             handleChange, 
                             errors 
                          })}
              <Grid container spacing={2}>
                <Grid size = "auto">
                  <button type="button" 
                          className={styles.addButton} 
                          onClick={() => add(values)}
                  >
                    Add
                  </button>
                </Grid>
                <Grid size="auto">
                  <button type="button" 
                          className={styles.updateButton} 
                          onClick={() => update(values)}
                  >
                    update
                  </button>
                </Grid>
                <Grid size="auto">
                  <button type="button" 
                          className={styles.removeButton} 
                          onClick={() => remove(values)}
                  >
                    remove
                  </button>
                </Grid>
                <Grid size="auto">
                  <button className={styles.loadFieldsButton} 
                          type="button" 
                          onClick= {() => loadFields(values)}
                  >
                    Load Fields
                  </button>
                </Grid>
                <Grid size="auto">
                  <button 
                    className={styles.clearFieldsButton} 
                    type="button" 
                    onClick={() => {
                      clearFields();
                      setErrors({});
                    }}
                  >
                      Clear Fields
                  </button>
                </Grid>
              </Grid>
            <Grid container spacing={2} className ={styles.productList}>
              <Grid size = {{xs: 12}}>
                <h2>Products List</h2>
            </Grid>
            
            <Grid container spacing={2}>
              <Grid sx={{ maxWidth: '670px', width: '100%' }} size = {{xs:6}}>
                <DataGrid
                  className= {styles.dataGrid}
                  rows={products}
                  columns={columns}
                  initialState={{
                    sorting: {
                      sortModel: [
                        { field: 'id', sort: 'desc' } // ordena pelo campo 'id' em ordem decrescente
                      ],
                    },
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  rowSelectionModel={selectedId}
                  onRowSelectionModelChange={(newSelectionModel) => {
                    setSelectedId(newSelectionModel);
                  }}
                  pageSizeOptions={[5]}
                  sx={{
                    '& .headerField': {
                    backgroundColor: '#0a192f',
                    },
                    '&& .MuiTablePagination-root': {
                      color:'#ddd',
                    },
                    '&& .MuiDataGrid-sortIcon': {
                      color: '#ddd',
                    },
                    '&& .MuiDataGrid-row:hover': {
                      backgroundColor: 'rgba(145, 146, 174, 0.7)', 
                    },
                    '& .MuiDataGrid-row.Mui-selected': {
                      backgroundColor: 'rgba(145, 146, 174, 0.7)', 
                    },
                    height: 370,
                    backgroundColor: '#0a192f',
                    color: '#ddd',
                  }}
                />
              </Grid>
              <Grid size = {{xs:6}}>
                {isLoading && (
                <Card sx={{ minWidth: 250, backgroundColor: '#1e293b', color: '#fff' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Wait...
                    </Typography>
                    <Typography variant="body2">
                      The server may take a few minutes to respond after a
                      period of inactivity.
                      This is normal due to the free web hosting service. 
                      Please wait approximately 1 minutes for the list to load.
                    </Typography>
                  </CardContent>
                </Card>
                )}
              </Grid>
            </Grid>
              <Grid size={{xs:12}}>
                <p>Total products: {products.length}</p>
              </Grid>
            </Grid> 
            </form> 
        </div> 
      );
    }}
  </Formik> 
)}
export default InventoryManager;