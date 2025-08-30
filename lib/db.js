const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'yamanote.proxy.rlwy.net',
  port: 32625,
  user: 'root',
  password: 'sanChMdoCPihnTDhsMASOEFdaXLicWFb',
  database: 'railway',
  ssl: {
    rejectUnauthorized: false
  }
};

async function getConnection() {
  return await mysql.createConnection(dbConfig);
}

async function query(sql, params = []) {
  const connection = await getConnection();
  try {
    const [rows] = await connection.execute(sql, params);
    return rows;
  } finally {
    await connection.end();
  }
}

module.exports = { query, getConnection };
