const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const router = express.Router();

let books = [];
let newId = 0;

// Load the json data
async function loadBooks() {
    try {
        const filePath = path.join(__dirname, "../data/books.json");

        data = await fs.readFile(filePath, "utf-8");

        books = JSON.parse(data);

        // sort by id and get the largest id + 1 as newId used for post
        books.sort((a, b) => a.id - b.id);
        newId = books[books.length - 1].id + 1;

        console.log("Library loaded!");
    } catch (err) {
        console.error("Error reading the JSON file", err);
    }
}

// Update the json data
async function saveBooks() {
    try {
        const filePath = path.join(__dirname, '../data/books.json');

        const jsonData = JSON.stringify(books, null, 2);

        await fs.writeFile(filePath, jsonData, 'utf-8');

        console.log("Books successfully saved to books.json!");
    } catch (error) {
        console.error("Error writing to the JSON file:", error);
    }
}

loadBooks();

const findBookById = (req, res, next) => {
    const urlId = Number(req.params.id);

    const reqBook = books.find(book => book.id === urlId);

    if (reqBook !== undefined) {
        req.book = reqBook;
        next();
    } else {
        res.status(404).send(`Book with id "${req.params.id} not found"`);
    }
}

router.get("/", (req, res) => {
    res.send(books);
});

router.get("/:id", findBookById, (req, res) => {
    res.send(req.book);
});

router.post("/", (req, res) => {
    const book = req.body;

    if (book === undefined) {
        res.status(400).send("Not Added: The book is missing critical information!");
        return;
    }

    book.id = newId;

    // update new Id
    newId += 1;

    const isInvalidBook =
        book.title === undefined ||
        book.author === undefined ||
        book.imageUrl === undefined ||
        book.year === undefined;

    if (isInvalidBook) {
        res.status(400).send("Not Added: The book is missing critical information!");
        return;
    }

    books.push(book);

    res.status(201).send(`Book "${book.title}" was added successfully!`);

    saveBooks();
});

router.delete("/:id", (req, res) => {
    const urlId = Number(req.params.id);

    const bookIndex = books.findIndex(
        book => book.id === urlId
    );

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);

        res.status(200).send("Book deleted");
    } else {
        res.status(404).send("Book not found");
    }

    saveBooks();
});

router.put("/:id", findBookById, (req, res) => {
    req.book.title = req.body.title ? req.body.title : req.book.title;
    req.book.author = req.body.author ? req.body.author : req.book.author;
    req.book.imageUrl = req.body.imageUrl ? req.body.imageUrl : req.book.imageUrl;
    req.book.year = req.body.year ? req.body.year : req.book.year;

    res.send(`Book with id ${req.book.id} updated: ${JSON.stringify(req.book)}`);

    saveBooks();
});

module.exports = router;