const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "todo_app_user",
    password: "1234",
    database: "todo_app"
});

connection.connect(err => {
    if (err) {
        console.error(err.stack);
        return;
    }

    console.log("Connected as id " + connection.threadId);
});

module.exports = connection;