import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'yamanote.proxy.rlwy.net',
  port: parseInt(process.env.DB_PORT) || 32625,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'sanChMdoCPihnTDhsMASOEFdaXLicWFb',
  database: process.env.DB_NAME || 'railway',
  ssl: {
    rejectUnauthorized: false
  },
  connectTimeout: 60000,
  acquireTimeout: 60000,
  timeout: 60000
};

export async function getConnection() {
  return await mysql.createConnection(dbConfig);
}

export async function query(sql, params = []) {
  const connection = await getConnection();
  try {
    const [rows] = await connection.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    await connection.end();
  }
}
