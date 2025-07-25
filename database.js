const mysql = require("mysql2");

let pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tasks_db', 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = {
    pool
};
