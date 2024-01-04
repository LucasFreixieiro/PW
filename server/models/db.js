const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config({ path: './config/.env' });

console.log(process.env.DB_HOST, process.env.DB_USER)

const connection = mysql.createConnection({
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    port: process.env.DB_PORT
});

connection.connect(error => {
    if(error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;