const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "admin",
  database: "bd_produtos",
});

module.exports = db;