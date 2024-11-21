import { query } from "../database/postgres.js";

async function Listar(id_user) {
  let filtro = [];
  let sql = `
    SELECT 
      A.id_appointment,
      S.description AS service,
      D.name AS doctor,
      D.specialty,
      TO_CHAR(A.booking_date, 'YYYY-MM-DD') AS booking_date,
      A.booking_hour,
      U.name AS user,
      DS.price
    FROM appointments A
    INNER JOIN doctors D ON A.id_doctor = D.id_doctor
    INNER JOIN services S ON A.id_service = S.id_service
    INNER JOIN users U ON A.id_user = U.id_user
    INNER JOIN doctors_services DS ON A.id_doctor = DS.id_doctor AND A.id_service = DS.id_service
  `;

  if (id_user) {
    sql += "WHERE A.id_user = $1 ";
    filtro.push(id_user);
  }

  sql += "ORDER BY A.booking_date, A.booking_hour";
  
  const appointments = await query(sql, filtro);
  return appointments;
}

async function Inserir(id_user, id_doctor, id_service, booking_date, booking_hour) {
  let sql = `INSERT INTO appointments(id_user, id_doctor, id_service, booking_date, booking_hour)VALUES($1, $2, $3, $4, $5) returning id_appointment`;

  const appointment = await query(sql, [id_user, id_doctor, id_service, booking_date, booking_hour]);
  return appointment[0];
}

async function Excluir(id_user, id_appointment) {
  let sql = `DELETE FROM appointments WHERE id_user = $1 AND id_appointment = $2`;

  await query(sql, [id_user, id_appointment]);
  return { id_appointment };
}

export default { Listar, Inserir, Excluir };