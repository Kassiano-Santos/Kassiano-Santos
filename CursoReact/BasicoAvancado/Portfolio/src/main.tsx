import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Grid from '@mui/material/Grid2';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Grid>
        <App />
      </Grid>
    </React.StrictMode>,
)
