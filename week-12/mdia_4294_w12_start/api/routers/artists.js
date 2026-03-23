//  api/routers/artists.js
const express = require("express");
const artistRouter = express.Router();
const db = require("../db");

artistRouter.get("/", (req, res) => {
	const sql = "SELECT * FROM artists";
	db.query(sql, (err, results) => {
		if (err) {
			res.status(500).send(err);
			return;
		}
		res.json(results);
	});
});

// Handle POST requests to add a new artist
artistRouter.post("/", (req, res) => {
	// Get the new artist name from the request body
	const { name } = req.body;

	// Create the SQL query to insert the new artist
	const addArtistSQL = `INSERT INTO artists (name) VALUES (?)`;

	// Execute the SQL query, but subsistute the '?' with the new artist name
	db.query(addArtistSQL, [name], (err, results) => {
		// If an error occurred, log it and return a 500 status code
		if (err) {
			console.error(err);
			return res.status(500).send(err);
		}
		// If the query was successful, return a JSON response with the new artist ID to be used later
		res.status(201).json({
			artistId: results.insertId,
			message: "Artist added successfully",
		});
	});
});

module.exports = artistRouter;
