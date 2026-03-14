// Database connection module
// Creates a single MySQL connection and exports it so every router
// can share the same connection without reconnecting each time

const mysql = require('mysql2');

// Connect to the local MySQL database (standard port 3306)
// Change user/password if your MySQL credentials are different
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yang.w.1',
  database: 'jd_games',
  port: 3306
});

// Log a success message once connected, or print the error if connection fails
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the jd_games database!');
});

module.exports = db;
