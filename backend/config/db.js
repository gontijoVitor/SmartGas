// backend/config/db.js
// Conecta codigo ao db

import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'smartgas',
});

export default db;
