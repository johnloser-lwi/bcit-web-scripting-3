const express = require("express");
const bodyParser = require("body-parser");
const booksRouter = require("./routes/books");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use("/books", booksRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});