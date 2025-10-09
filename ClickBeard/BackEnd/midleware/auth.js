const jwt = require('jsonwebtoken');

const authToken = (req, res, next)=>{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if(!token){
    res.status(401).json({error: 'É necessário token de acesso'})
  }

  jwt.verify(
    token, 
    process.env.JWT_SECRET || 'ClickBeardTokenSecret', (err, user) => {
      if(err){
        return res.status(403).json({error: "Token inválido ou expirado"});
      }
      req.user = user;
      next();
  });
};
module.exports = authToken;