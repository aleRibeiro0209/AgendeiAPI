import jwt from "jsonwebtoken";
import config from "../core/config.js";

function CreateToken(id_user) {
  const token = jwt.sign({ id_user }, config.jwtSecret, {
    expiresIn: 9999999
  });

  return token;
}

function ValidateToken(req, res, next) {
  const authToken = req.headers.authorization;
  
  if (!authToken)
    return res.status(401).json({ error: "Token não informado"});

  const [bearer, token] = authToken.split(" ");

  jwt.verify(token, config.jwtSecret, (err, decoded) => {

    if (err)
      return res.status(401).json({ error: "Token inválido"});

    req.id_user = decoded.id_user;
    next();
  });
}

export default { CreateToken, ValidateToken };