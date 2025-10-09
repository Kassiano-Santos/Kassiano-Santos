const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// GET /allusers -> retorna todos os usuários
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    
    if(result.rows.length === 0){
      throw new Error("Nenhum usuário cadastrado"); 
    }else {
      res.json(result.rows);
    }
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

//login
 router.post('/login', async(req,res)=> {
  try {
    const {email_user, password_hash} = req.body;

    if(!email_user || !password_hash){
      return res.status(400).json({error: "E-mail e Senha são obrigatórios."});
    }
    //Identificando usuário
    const userResult = await pool.query(
      `SELECT * FROM users WHERE email_user = $1`,
      [email_user]
    );
    if(userResult.rows.length === 0){
      return res.status(401).json(
        {error: "Nenhum usuário foi encontrado para esse email"}
      )
    }
    const user = userResult.rows[0];

    //Verificando Senha
    const isPasswordValid = await bcrypt.compare(password_hash, user.password_hash);

    if(!isPasswordValid){
      return res.status(401).json({error: "Senha incorreta."})
    }
    //Geração de token JWT
    const token = jwt.sign(
      {
        id: user.id_user,
        nameUser: user.name_user,
        email: user.email_user,
        role: user.role_user
      },
      process.env.JWT_SECRET || 'ClickBeardTokenSecret',
      { expiresIn: '24h' } //token expira em 24h
    );
    const userWithoutPass = {...user};
    delete userWithoutPass.password_hash;

    res.status(200).json({
      message: "Login realizado com sucesso",
      token,
      user: userWithoutPass
    });
  } 
  catch (error) {
    res.status(500).json(
      {error: "erro interno no servidor no momento do login"}
    )
  }
});

// post /createuser -> cria usuarios novos
router.post('/createuser', async(req, res) => {
  try {
    const {name_user, email_user, password_hash, role_user} = req.body;

    if(!name_user || !email_user || !password_hash){
      return res.status(400).json({error: 'Todos os campos são obriatórios'})
    }
    
    const emailCheck = await pool.query(
      `SELECT email_user from users where email_user = $1`,
      [email_user]);

     if (emailCheck.rows.length > 0){
      return res.status(400).json({error: 'E-mail já cadastrado'})
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password_hash,saltRounds);
    
    const result = await pool.query(
      `INSERT INTO users 
        (name_user, email_user, password_hash, role_user) 
      VALUES 
        ($1, $2, $3, $4) 
      RETURNING *`,
      [name_user, email_user, hashedPassword, role_user]
    );
    //res.status(201).json(result.rows[0]);
    const newUser = result.rows[0];

    const token = jwt.sign({
      id: newUser.id,
      email: newUser.email_user,
      role: newUser.role_user,
      name: newUser.name_user
    },
    process.env.JWT_SECRET || 'ClickBeardTokenSecret',
    { expiresIn: '24h'}
  );
  
  const userWithoutPassword = { ...newUser };
  delete userWithoutPassword.password_hash; 

  res.status(201).json({
    message: "Usuário cadastrado com sucesso",
    token,
    user: userWithoutPassword
  });
} catch (error) {
    res.status(500).send({error: 'Erro ao criar usuário'});
  }
});
 
module.exports = router;