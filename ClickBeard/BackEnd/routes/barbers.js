const express = require('express');
const router = express.Router();
const pool = require('../config/database');

//retorno de todos os barbeiros
router.get('/', async (req, res)=> {
  try {
    const {id_specialties} = req.query;

    if(id_specialties){
      const result = await pool.query(
        `SELECT
          b.id_barber, 
          b.name_barbers
        FROM barbers b
        INNER JOIN barber_specialties bs ON b.id_barber = bs.id_barber
        WHERE bs.id_specialties = $1  
        ORDER BY b.name_barbers`, 
        [id_specialties]
      )
      if (result.rows.length === 0) {
        return res.json([]);
      } 
      res.json(result.rows);
    } else {
        result = await pool.query('SELECT * FROM barbers ORDER BY name_barbers');
        res.json(result.rows);
    }
  } catch (error) {
    res.status(500).send("Erro ao buscar barbeiros.")
  }
});

router.post('/createbarbers', async(req,res)=> {
  try {
    const {name_barbers, age_barber, hire_date} = req.body;

  if (!name_barbers || !age_barber || !hire_date) {
      return res.status(400).json({
        error: "Todos os campos são obrigatórios"
      });
    }

    const existingBarber = await pool.query(
      `SELECT * FROM barbers WHERE name_barbers = $1`,
      [name_barbers.trim()]
    );

    if (existingBarber.rows.length > 0) {
      return res.status(409).json({
        error: "Este Barbeiro já existe"
      });
    }

  const result = await pool.query(`
    INSERT INTO barbers 
      (name_barbers, age_barber, hire_date)
    VALUES 
      ($1, $2, $3)
      RETURNING *`,
    [name_barbers, age_barber, hire_date]
  )

  res.status(201).json({
      message: "Barbeiro cadastrado com sucesso!",
      barber: result.rows[0]
    });
  } catch (error) {
    
  }
})

router.post('/assocbarbspec/bulk', async(req,res)=> {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const { id_barber, specialties } = req.body;

    if(!id_barber || !specialties){
      return res.status(400).json({
        error: "ID do barbeiro e ID da especialidade são obrigatórios."
      });
    }
    if(!id_barber || !specialties || !Array.isArray(specialties)) {
      return res.status(400).json({
        error: "Dados inválidos"
      });
    }

    const results = [];
    const errors = [];

    for (const id_specialties of specialties) {
      const existingAssociation = await client.query(
        `SELECT * FROM barber_specialties 
         WHERE id_barber = $1 AND id_specialties = $2`,
        [id_barber, id_specialties]
      );

      if(existingAssociation.rows.length > 0) {
        const specialtyResult = await client.query(
          'SELECT name_specialties FROM specialties WHERE id_specialties = $1',
          [id_specialties]
        );
        const specialtyName = specialtyResult.rows[0]?.name_specialties || 'Especialidade';
        errors.push(`A especialidade "${specialtyName}" já está associada.`);
      } else {
        const result = await client.query(
          `INSERT INTO barber_specialties (id_barber, id_specialties)
           VALUES ($1, $2) RETURNING *`,
          [id_barber, id_specialties]
        );
        results.push(result.rows[0]);
      }
    }
    if (errors.length > 0) {
      await client.query('ROLLBACK'); //Rollback se houver erros
      return res.status(409).json({
        error: errors.join('\n')
      });
    }

    await client.query('COMMIT'); //Commit se tudo ok
    
    res.status(201).json({
      message: "Todas as associações criadas com sucesso",
      associations: results
    });

  } catch (error) {
    await client.query('ROLLBACK'); //Rollback em caso de erro
    res.status(500).json({
      error: "Não foi possível criar as associações",
      details: error.message
    });
  } finally {
    client.release();
  }
})

module.exports = router;