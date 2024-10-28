import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import Grid from '@mui/material/Grid2';
import { Container, CssBaseline } from '@mui/material';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <CssBaseline />
        <App />
      </React.StrictMode>
)
