import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from "./InventoryManager.module.css";
import {Product} from "../types/Product";
import  Grid from '@mui/material/Grid2';
import { DataGrid, GridColDef,GridRowSelectionModel  } from '@mui/x-data-grid';
import * as yup from "yup";
import {FormSchema} from "./FormSchema.tsx";

const InventoryManager = () => {
  const BASE_URL = 'http://localhost:8080/inventorymanagerproduct';
  const [formData,setFormData] = useState({
    id:"",
    productName: "",
    price:"",
    quantity: "",
    status:""
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedId, setSelectedId] = useState<GridRowSelectionModel>({ type: 'include', ids: new Set()});

  
  useEffect(() => {
    listAll();
  },[]);

  const  listAll = async()=> {
    const response = await fetch(BASE_URL);
    const products: Product[] = await response.json();
    
    setProducts(products);
  }

  const getProductsFromForm = ()=> {
    return { 
      id: formData.id,
      productName: formData.productName, 
      price: formData.price, 
      quantity: formData.quantity, 
      status: formData.status 
    }
  }
 
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setErrors({ ...errors, [e.target.name]: "" }); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await FormSchema.validate(formData, { abortEarly: false });
    } catch (err: any) {
      const newErrors: { [key: string]: string } = {};
      err.inner.forEach((error: yup.ValidationError) => {
        if (error.path) newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

   const add = async ()=> {
			const product = getProductsFromForm();
			await fetch(BASE_URL, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(product)
			});
			listAll();
      clearFields();
  }

  const update = async ()=> {
    const product = getProductsFromForm();
    const id = product.id;
    await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(product)
    });
    listAll(); 
  }
  const remove = async ()=> {
    const product = getProductsFromForm();
    const id = product.id;
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE'});
    listAll();
    clearFields();
  }

  const clearFields = ()=> {
    setFormData({
      id: "",
      productName: "",
      price: "",
      quantity: "",
      status: ""
    })
  }

  const loadFields =() => {
    const product = getProductsFromForm();
    let id: number | null = Number(product.id);

    if(isNaN(id) || id === 0 || product.id === ""){
      id = Array.from(selectedId.ids)[0] as number;
    } else if(product.id !== "" && selectedId.ids.size > 0){
      id = Array.from(selectedId.ids)[0] as number;
    }
    if(id !== null || id !== ""){
      fetch(`${BASE_URL}/${id}`)
		  .then(response => response.json())
		  .then(product => {
        setFormData({
        id: product.id,
        productName: product.productName,
        price: product.price,
        quantity: product.quantity,
        status: product.status  
        })
		  });
    }			
  } 

  const renderInput = (label: string, name: keyof typeof formData) => (
    <Grid container spacing={2} className={styles[name]}>
      <Grid size="auto">
        <label>{label}</label>
      </Grid>
      <Grid size="auto">
        <input
          type="text"
          name={name}
          value={formData[name]}
          onChange={handleChange}
          style={{
            borderColor: errors[name] ? "red" : undefined,
            borderWidth: errors[name] ? 2 : undefined,
          }}
        />
        {errors[name] && (
          <p style={{ color: "red", margin: 0 }}>{errors[name]}</p>
        )}
      </Grid>
    </Grid>
  );

  return(
    <div className = {styles.container}>
      <h1 className={styles.title}>Inventory Manager Product</h1>

      <form onSubmit={handleSubmit} className={styles.container}>
        {renderInput("ID:", "id")}
        {renderInput("Product Name:", "productName")}
        {renderInput("Price:", "price")}
        {renderInput("Quantity:", "quantity")}
        {renderInput("Status:", "status")}

        <Grid container spacing={2}>
          <Grid size = "auto">
            <button className={styles.addButton} onClick={add} type="submit" >Add</button>
          </Grid>
          <Grid size="auto">
            <button className={styles.updateButton} onClick={update} type="submit">update</button>
          </Grid>
          <Grid size="auto">
            <button className={styles.removeButton} onClick={remove}>remove</button>
          </Grid>
          <Grid size="auto">
            <button className={styles.loadFieldsButton} type="button" onClick= {loadFields}>Load Fields</button>
          </Grid>
          <Grid size="auto">
            <button className={styles.clearFieldsButton} type="button" onClick={clearFields}>Clear Fields</button>
          </Grid>
        </Grid>
      
      {/** 
      <Grid container spacing={2}className = {styles.id} >
        <Grid size="auto">
            <label>ID:</label>
          </Grid>
        <Grid size="auto">
          <input 
            type="text" 
            name="id" 
            value={formData.id}
            onChange={(e) => handleChange(e)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} className = {styles.productName}>
        <Grid size="auto">
          <label>Product Name:</label>
        </Grid>
        <Grid size="auto">
          <input 
            type="text" 
            name="productName"  
            value = {formData.productName}
            onChange={(e) => handleChange(e)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} className = {styles.price}>
        <Grid size="auto">
          <label>Price:</label>
        </Grid>
        <Grid size="auto">
        <input 
          type="text" 
          name="price"  
          value = {formData.price}
          onChange={(e) => handleChange(e)}
        />
        </Grid>
      </Grid>
      <Grid container spacing={2} className = {styles.quantity}>
        <Grid size="auto">
          <label>Quantity:</label>
        </Grid>
        <Grid size="auto">
          <input 
            type="text" 
            name="quantity"  
            value = {formData.quantity}
            onChange={(e)=> handleChange(e)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} className = {styles.status}>
        <Grid size="auto">
          <label>Status:</label>
        </Grid>
        <Grid size="auto">
          <input 
            type="text" 
            name="status"  
            value = {formData.status}
            onChange={(e)=> handleChange(e)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size = "auto">
          <button className={styles.addButton} onClick={add}>Add</button>
        </Grid>
        <Grid size="auto">
          <button className={styles.updateButton} onClick={update}>update</button>
        </Grid>
        <Grid size="auto">
          <button className={styles.removeButton} onClick={remove}>remove</button>
        </Grid>
        <Grid size="auto">
          <button className={styles.loadFieldsButton} onClick= {loadFields}>Load Fields</button>
        </Grid>
        <Grid size="auto">
          <button className={styles.clearFieldsButton} onClick={clearFields}>Clear Fields</button>
        </Grid>
      </Grid>
      */}
      <Grid container spacing={2} className ={styles.productList}>
        <Grid size = {{xs: 12}}>
          <h2>Products List</h2>
      </Grid>
      
      <div style={{ maxWidth: '670px', width: '100%' }}>
        <DataGrid
          className= {styles.dataGrid}
          rows={products}
          columns={columns}
          initialState={{
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
              backgroundColor: 'rgba(145, 146, 174, 0.7)', // substitua pela cor que quiser
            },
            '& .MuiDataGrid-row.Mui-selected': {
              backgroundColor: 'rgba(145, 146, 174, 0.7)', // cor da linha selecionada
            },
            height: 370,
            backgroundColor: '#0a192f',
            color: '#ddd',
          }}
        />
      </div>
        <Grid size={{xs:12}}>
          <p>Total de produtos: {products.length}</p>
        </Grid>
      </Grid>  
      </form>  
    </div>    
  )
}
export default InventoryManager;