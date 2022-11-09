const {createPool} = require('mysql');

const pool = createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  connectionLimit: 10
});
const mysql = require('mysql2');
const connection = mysql.createConnection(process.env.DATABASE_URL);

module.exports = connection;