const mysql = require('mysql2');

// create a database instance, the default port for mysql server on my PC is 3306
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yang.w.1',
  database: 'jd_games',
  port: 3306
});

// connect to the database
db.connect(err => {
  // if there's an error, log it
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the jd_games database!');
});

// export the db for other scripts to access
module.exports = db;
