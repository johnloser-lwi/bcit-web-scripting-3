// api/routers/tapes.js
const express = require("express");
const tapesRouter = express.Router();
const db = require("../db");
const upload = require("../storage");

tapesRouter.get("/", (req, res) => {
	const sql = `
        SELECT albums.*, artists.name AS artist_id
		FROM albums
		JOIN artists ON albums.artist_id = artists.id
    `;

	db.query(sql, (err, results) => {
		if (err) {
			res.status(500).send(err);
			return;
		}

		res.json(results);
	});
});

// Get a single tape from the database
tapesRouter.get("/:id", (req, res) => {
	// Get the id from the URL
	const { id } = req.params;

	const sql = `
        SELECT albums.*, artists.name AS artist, artists.id AS artist_id, albums.description
        FROM albums
        JOIN artists ON albums.artist_id = artists.id
        WHERE albums.id = ?`;

	// Substitute the '?' with the id from the URL to prevent SQL injection
	db.query(sql, [id], (err, results) => {
		if (err) {
			console.error(err);
			res.status(500).send("An error occurred");
		}
		res.json(results[0]);
	});
});

tapesRouter.post("/", upload.single("image"), (req, res) => {
	// Get the artist ID and title from the request body
	const { artist, title } = req.body;

	// The uploaded file's filename is stored in 'req.file.filename'
	const image = req.file.filename;

	// Create the SQL query to insert the new tape
	const addAlbumSQL = `INSERT INTO albums (artist_id, name, image_name) VALUES (?, ?, ?)`;

	// Run the query above, substituting the '?' with the artist ID, title and image in that order
	db.query(addAlbumSQL, [artist, title, image], (err, results) => {
		// If an error occurred, log it and return a 500 status code
		if (err) {
			console.error(err);
			return res.status(500).json({ error: "Server error" });
		}

		res.status(200).json({ message: "Tape added successfully" });
	});
});

tapesRouter.put("/:id", upload.single("image"), (req, res) => {
	const { id } = req.params;
	const { title, description, artist_id } = req.body;

	let sql = "UPDATE albums SET name = ?, description = ?, artist_id = ?";

	const queryParams = [title, description, artist_id];

	if (req.file) {
		sql += ", image_name = ?";
		queryParams.push(req.file.filename);
	}

	sql += " WHERE id = ? LIMIT 1";
	queryParams.push(id);

	db.query(sql, queryParams, (err, results) => {
		if (err) {
			console.error(err);
			return res.status(500).json({error: "Error updating tape"})
		}

		res.json({message: "Tape updated successfully!"})
	});

});

tapesRouter.delete("/:id", (req, res) => {
	const { id } = req.params;

	const sql = `DELETE FROM albums WHERE id = ? LIMIT 1`;

	db.query(sql, [id], (err, results) => {
		if (err) {
			console.error(err);
			res.status(500).send("An error occured");
		}

		res.json({message: "Tape deleted successfully!"})
	});
});

module.exports = tapesRouter;
