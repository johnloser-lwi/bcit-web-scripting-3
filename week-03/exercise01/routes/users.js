const express = require("express");
const router = express.Router();

const users = [
    { id: 1, name: "Julia" },
    { id: 2, name: "Gurinder" },
    { id: 3, name: "Lasia" }
]

router.get("/", (req, res) => {
    res.send(users);
});

module.exports = router;