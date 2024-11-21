import { query } from "../database/postgres.js"

async function Listar(name) {
  let filtro = [];
  let sql = "SELECT * FROM doctors ";

  if (name) {
    sql += "WHERE name LIKE $1 ";
    filtro.push("%" + name + "%");
  }

  sql += "ORDER BY name";
  const doctors = await query(sql, filtro);

  return doctors;
}

async function Inserir(name, specialty, icon) {
  let sql = "INSERT INTO doctors(name, specialty, icon) VALUES ($1, $2, $3) returning id_doctor";

  const doctor = await query(sql, [name, specialty, icon]);
  return doctor[0];
}

async function Editar(id_doctor, name, specialty, icon) {
  let sql = "UPDATE doctors SET name = $2, specialty = $3, icon = $4 WHERE id_doctor = $1";

  await query(sql, [id_doctor, name, specialty, icon]);
  return { id_doctor };
}

async function Excluir(id_doctor) {
  let sql = "DELETE FROM doctors WHERE id_doctor = $1";

  await query(sql, [id_doctor]);
  return { id_doctor };
}

async function ListarServicos(id_doctor) {
  let sql = `
    SELECT D.id_service, D.price, S.description FROM doctors_services D
    INNER JOIN services S
    ON D.id_service = S.id_service
    WHERE D.id_doctor = $1
    ORDER BY S.description
  `;

  const services = await query(sql, [id_doctor]);
  return services;
}

export default { Listar, Inserir, Editar, Excluir, ListarServicos }