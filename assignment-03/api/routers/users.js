const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {body, validationResult} = require('express-validator');
const db = require('../db');

const userRouter = express.Router();

// read the secret from the environment variable set in .env
const JWT_SECRET = process.env.JWT_SECRET;

// register a new user
userRouter.post('/', [
    // validate that the email is a proper email address and normalize it
    body('email').isEmail().withMessage("Invalid email address").normalizeEmail(),
    // validate that the password is at least 8 characters
    body('password').isLength({min:8}).withMessage('Password must be at least 8 characters long')
], async (req, res) => {
    const errors = validationResult(req);

    // if validation fails, collect all error messages and return them
    if (!errors.isEmpty()) {
        let msg = "";
        for (let i=0; i < errors.array().length; i++) {
            msg += errors.array()[i].msg +"\n";
        }
        return res.status(400).json({message: msg})
    }

    const {email, password} = req.body;

    // hash the password before storing it so the plain text is never saved to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, hashedPassword], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({message: "Database Error"});
        }

        res.status(201).json({message: "User registered successfully", userId: results.insertId})
    })
});

// sign in an existing user and return a jwt token
userRouter.post("/signin", [
    body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),
    body("password").notEmpty().withMessage("Password required"),
], async (req, res) => {
    const errors = validationResult(req);

    // if validation fails, collect all error messages and return them
    if (!errors.isEmpty()) {
        let msg = "";
        for (let i=0; i < errors.array().length; i++) {
            msg += errors.array()[i].msg +"\n";
        }
        return res.status(400).json({message: msg})
    }

    const {email, password} = req.body;

    // look up the user by email in the database
    const [userRecord] = await db.promise()
        .query("SELECT * FROM users WHERE email = ?", [email]);

    // use a generic error message so we don't reveal whether the email exists
    if (userRecord.length === 0) {
        return res.status(401).json({message: "Invalid email or password"});
    }

    const user = userRecord[0];

    // compare the submitted password against the stored hash
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(401).json({message: "Invalid email or password"});
    }

    // sign a token with the user's id and email, expires in 1 hour
    const token = jwt.sign({userId: user.id, email: user.email}, JWT_SECRET, {expiresIn: "1h"});

    res.status(200).json({message: "Login successful", jwt: token});
});

module.exports = userRouter;
