const sql = require("mysql")
const dotenv = require("dotenv").config()


var connection = sql.createConnection({
    multipleStatements:true,
    user:process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port:3306
})


module.exports = connection;