import mysql from "mysql2/promise";

const db = mysql.createPool({
 uri:process.env.DATABASE_URL,
 ssl: {
  ca:process.env.DB_SSL_CA
 }
});

export default db;
