import serviceUser from "../services/service.user.js";

async function Listar(req, res) {

  // const users = await seListar();
  // res.status(200).json(users);
}

async function Inserir(req, res) {
  const { name, email, password } = req.body;

  const user = await serviceUser.Inserir(name, email, password);
  res.status(201).json(user);
}

async function Login(req, res) {
  const { email, password } = req.body;

  const user = await serviceUser.Login(email, password);
  user.length === 0 ? res.status(401).json({ error: "E-mail ou senha inválida" }) : res.status(200).json(user);
}

export default { Inserir, Login }