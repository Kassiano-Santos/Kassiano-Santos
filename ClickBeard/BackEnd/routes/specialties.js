const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res)=> {
  try {
    const {id_specialties} = req.query;

    const result = await pool.query(
      `SELECT * FROM specialties ORDER BY name_specialties`
    );

    if(result.rows.length === 0){
      return res.json([]);
    }

    res.json(result.rows);
    
  } catch (error) {
    res.status(500).send("Erro ao buscar especialidades.")
  }
});

router.post('/createspecialty', async (req,res)=> {
  try {
    const {name_specialties} = req.body;
    
    if (!name_specialties || name_specialties.trim() === '') {
      return res.status(400).json({
        error: "O nome da especialidade é obrigatório"
      });
    }

    const existingSpecialty = await pool.query(
      `SELECT * FROM specialties WHERE name_specialties = $1`,
      [name_specialties.trim()]
    );

    if (existingSpecialty.rows.length > 0) {
      return res.status(409).json({
        error: "Esta especialidade já existe"
      });
    }
    
    const result = await pool.query(`
      INSERT INTO specialties 
        (name_specialties)
      VALUES 
        ($1)
      RETURNING *`,
    [name_specialties]);

    res.status(201).json({
      message: "Especialidade criada com sucesso!",
      specialty: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({error: "Não foi possível criar especialidade."})
  }
})

module.exports = router;