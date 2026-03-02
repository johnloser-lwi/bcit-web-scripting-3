const mysql = require("mysql2");

const db = mysql.createConnection({
  host: 'localhost',
  user: 'music_db_user',
  password: 'password',
  database: 'music',
  port: 8889
});

db.connect(err => {
    if (err) {
        console.error("Error connecting to the database: ", err);
        return;
    }
    console.log("Connected to the music database!");
});

module.exports = db;