const express = require("express");
const connection = require("./connection");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send(`Server running at http://localhost:${port}/`)
});

app.get("/todos", (req, res) => {
    connection.query("SELECT * FROM todos", (error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(result);
    });
});

app.get("/todos/:id", (req, res) => {
    connection.query(`SELECT * FROM todos WHERE id = ${req.params.id}`, (error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (result.length <= 0) {
            return res.status(404).send(`Todo with id ${req.params.id} not found!`);
        }
        res.json(result[0]);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});