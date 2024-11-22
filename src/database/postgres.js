import pkg from "pg";
import config from "../core/config.js";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: config.dbUrl,
  ssl: false
});

// Função genérica para executar consultas ao banco
function query(command, params = [], method = 'all') {
  return new Promise((resolve, reject) => {
    pool.query(command, params, (error, result) => {
      if (error) {
        reject(error);
      } else {
        // Processa o resultado com base no método solicitado
        if (method === 'all') {
          resolve(result.rows); // Retorna todas as linhas
        } else if (method === 'one') {
          resolve(result.rows[0] || null); // Retorna apenas a primeira linha
        } else {
          resolve(result); // Retorna o objeto completo do resultado
        }
      }
    });
  });
}

export { pool, query };