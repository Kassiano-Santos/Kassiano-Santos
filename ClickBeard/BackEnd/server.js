const express = require('express');
const app = express();
require('dotenv').config();

// Middleware para ler JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

// Rota User
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

// Rota appointment
const appointRoutes = require('./routes/appointments');
app.use('/appointments', appointRoutes);

// Rota Barber
const barbersRoutes = require('./routes/barbers');
app.use('/barbers', barbersRoutes);

//Rota de Especialidades
const specialtyRoutes = require('./routes/specialties');
app.use('/specialties', specialtyRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.send('API ClickBeard funcionando!');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});