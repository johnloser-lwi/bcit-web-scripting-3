const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {body, validationResult} = require('express-validator');
const db = require('../db');

const userRouter = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

userRouter.post('/', [
    body('email').isEmail().withMessage("Invalid email address").normalizeEmail(),
    body('password').isLength({min:8}).withMessage('Password must be at least 8 characters long')
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        let msg = "";
        for (let i=0; i < errors.array().length; i++) {
            msg += errors.array()[i].msg +"\n";
        }
        return res.status(400).json({message: msg})
    }

    const {email, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, hashedPassword], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({message: "Database Error"});
        }

        res.status(201).json({message: "User registered successfully", userId: results.insertId})
    })
});

userRouter.post("/signin", [
    body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),
    body("password").notEmpty().withMessage("Password required"),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        let msg = "";
        for (let i=0; i < errors.array().length; i++) {
            msg += errors.array()[i].msg +"\n";
        }
        return res.status(400).json({message: msg})
    }

    const {email, password} = req.body;

    const [userRecord] = await db.promise()
        .query("SELECT * FROM users WHERE email = ?", [email]);

    if (userRecord.length === 0) {
        return res.status(401).json({message: "Invalid email or password"});
    }

    const user = userRecord[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(401).json({message: "Invalid email or password"});
    }

    const token = jwt.sign({userId: user.id, email: user.email}, JWT_SECRET, {expiresIn: "1h"});

    res.status(200).json({message: "Login successful", jwt: token});
});

module.exports = userRouter;
