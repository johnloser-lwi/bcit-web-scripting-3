const mysql = require('mysql2');

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "yang.w.1",
	database: "music",
	port: 3306,
});

db.connect((err) => {
	if (err) {
		console.error("Error connecting to the database:", err);
		return;
	}
	console.log("Connected to the 🎶 database");
});

module.exports = db;




