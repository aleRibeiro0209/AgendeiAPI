import { query } from "../database/postgres.js";

async function Inserir(name, email, password) {
  let sql = "INSERT INTO users(name, email, password) VALUES ($1, $2, $3) returning id_user";

  const user = await query(sql, [name, email, password]);
  return user[0];
}

async function ListarByEmail(email) {
  let sql = "SELECT * FROM users WHERE email = $1";

  const user = await query(sql, [email]);
  return user.length === 0 ? [] : user[0];
}

async function Profile(id_user) {
  let sql = "SELECT id_user, name, email FROM users WHERE id_user = $1";

  const user = await query(sql, [id_user]);
  return user.length === 0 ? [] : user[0];
}

export default { Inserir, ListarByEmail, Profile };