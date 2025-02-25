// backend/config/db.js
// Conecta codigo ao db
// Troque os campos abaixo e altere o nome desse arquivo para "db.js", para funcionar corretamente

import mysql from 'mysql2';

const db = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: 'smartgas',
});

export default db;
