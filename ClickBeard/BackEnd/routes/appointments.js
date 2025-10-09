const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const authToken = require('../midleware/auth');

// GET appoint-> retorna todos os agendamentos
router.get('/', authToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    const nameUser = req.user.nameUser;

    // atualiza os status dos agendamentos passados
    await pool.query(`
      UPDATE appointments 
      SET appoint_status = 'done' 
      WHERE appoint_date < NOW() 
      AND appoint_status = 'scheduled'
    `);

    let result;
    
    if(userRole === 'admin'){
      result = await pool.query(`
        SELECT 
          a.*,
          b.name_barbers,
          s.name_specialties,
          u.name_user 
        FROM appointments a
        LEFT JOIN barbers b ON a.id_barber = b.id_barber
        LEFT JOIN specialties s ON a.id_specialties = s.id_specialties
        LEFT JOIN users u ON a.id_user = u.id_user
        ORDER BY a.appoint_date DESC
      `);
      
    } else {
      result = await pool.query(`
        SELECT 
          a.*,
          b.name_barbers,
          s.name_specialties,
          u.name_user  
        FROM appointments a
        LEFT JOIN barbers b ON a.id_barber = b.id_barber
        LEFT JOIN specialties s ON a.id_specialties = s.id_specialties
        LEFT JOIN users u ON a.id_user = u.id_user  
        WHERE a.id_user = $1 
        ORDER BY a.appoint_date DESC`, 
        [userId]
      );
    }
    res.json(result.rows); 
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

router.get('/occupied', async(req,res) => {
  const {id_barber} = req.query;

  if(!id_barber){
    return res.status(400).json({error: "ID do barbeiro é obrigatório"});
  }

  const result = await pool.query(
    `SELECT appoint_date 
       FROM appointments 
       WHERE id_barber = $1 
       AND appoint_status = 'scheduled'
       ORDER BY appoint_date`,
       [id_barber]
  );
  const occupedSlots = result.rows.map(row => row.appoint_date) ;

   res.json(occupedSlots);
});
// post /creatappoint -> cria agendamentos novos
router.post('/createappoint', async(req, res) => {
  try {
    const {
      id_user, 
      id_barber, 
      id_specialties, 
      appoint_date, 
      appoint_status = 'scheduled'
    } = req.body;

    if(!id_user || !id_barber || !id_specialties || !appoint_date){
      return res.status(400).json({error: 'Todos os campos são obriatórios'})
    }

    //validacao de data
    const appointDate = new Date(appoint_date);

    if(isNaN(appointDate.getTime())){
      return res.status(400).json({error: "Data inválida"})
    }

    //validacao de horario comercial
    const hour = appointDate.getHours();
    const min = appointDate.getMinutes();

    if(hour < 8 || hour >= 18){
      return res.status(400).json({
        error: "Expediente encerrado. Horário de funcionamento: 8h às 18h"
      });
    }

    const existAppoint = await pool.query(
      `SELECT * FROM appointments 
        WHERE id_barber = $1 
        and appoint_date = $2 
        and appoint_status != 'cancelled'`,
        [id_barber, appointDate]
    );

    if(existAppoint.rows.length > 0){
      return res.status(400).json({
        error: "Esse barberiro já possui agendamento nesse horário."
      });
    }

    const result = await pool.query(
      `INSERT INTO appointments 
        (id_user, id_barber, id_specialties, appoint_date, appoint_status) 
      VALUES 
        ($1, $2, $3, $4, $5) 
      RETURNING *`,
      [id_user, id_barber, id_specialties, appointDate, appoint_status]
    );
    res.status(201).json({
      message: 'Agendamento criado com sucesso.',
      appointment: result.rows[0]
    })
  } catch (error) {
    
    res.status(500).json({error: 'Erro ao criar agendamento'});
  }
});

router.post('/deleteappoint', async (req, res) => {
  const {
      id_user, 
      id_appointments,
      appoint_date
    } = req.body;
  try {
    const appointTime = new Date(appoint_date);
    const nowHour = new Date();

    //Cálculo de 2 horas antes do agendamento
    const twoHoursBefore = new Date(
      appointTime.getTime() - (2 * 60 * 60 * 1000)
    );

    if(nowHour > twoHoursBefore){
      return res.status(400).json({
        error: "Cancelamento permitido até 2 horas antes do horário agendado"
      });
    }

    const result = await pool.query(
      `UPDATE appointments 
      set appoint_status = 'cancelled' 
      where id_appointments = $1
      RETURNING *`,
      [id_appointments]
    )
    res.status(200).json({
      message: "Agendamento cancelado com sucesso.",
      appointment: result.rows[0]
    })
  } catch (error) {
    res.status(500).json({error: "Erro interno ao cancelar agendamento."})
  }
});

module.exports = router;