// Games router — handles all CRUD routes for /games
// Uses a JOIN so every response includes the genre name alongside the genre_id

const express = require('express');
const gamesRouter = express.Router();
const db = require('../db');
const upload = require('../storage');

// GET /games — returns all games joined with their genre name
// Accepts an optional ?genre_id= query parameter to filter results by genre
gamesRouter.get('/', (req, res) => {
  const { genre_id } = req.query;

  // Base SQL joins games with genres so we get the genre name in the response
  let sql = `
    SELECT games.*, genres.name AS genre
    FROM games
    JOIN genres ON games.genre_id = genres.id
  `;
  const params = [];

  // Append a WHERE clause only when the client wants a specific genre
  if (genre_id) {
    sql += ' WHERE games.genre_id = ?';
    params.push(genre_id);
  }

  sql += ' ORDER BY games.title';

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error fetching games:', err);
      return res.status(500).json({ error: 'Failed to fetch games' });
    }
    res.json(results);
  });
});

// GET /games/:id — returns a single game by its primary key, with genre name
gamesRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT games.*, genres.name AS genre
    FROM games
    JOIN genres ON games.genre_id = genres.id
    WHERE games.id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching game:', err);
      return res.status(500).json({ error: 'Failed to fetch game' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Game not found' });
    }
    // Return the first (and only) row as a single object instead of an array
    res.json(results[0]);
  });
});

// POST /games — creates a new game record
// upload.single('cover_image') processes the uploaded file before the handler runs
// The uploaded file's generated filename is available on req.file
gamesRouter.post('/', upload.single('cover_image'), (req, res) => {
  const { title, developer, release_year, description, genre_id } = req.body;

  // If a file was uploaded, use its stored filename; otherwise leave cover_image null
  const cover_image = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO games (title, developer, release_year, description, cover_image, genre_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [title, developer, release_year, description, cover_image, genre_id], (err, results) => {
    if (err) {
      console.error('Error creating game:', err);
      return res.status(500).json({ error: 'Failed to create game' });
    }
    res.status(201).json({ message: 'Game added successfully', id: results.insertId });
  });
});

// PUT /games/:id — updates an existing game
// Image upload is optional: if no new file is sent, the existing cover_image is kept
gamesRouter.put('/:id', upload.single('cover_image'), (req, res) => {
  const { id } = req.params;
  const { title, developer, release_year, description, genre_id } = req.body;

  if (req.file) {
    // A new image was uploaded — include cover_image in the UPDATE
    const cover_image = req.file.filename;
    const sql = `
      UPDATE games
      SET title = ?, developer = ?, release_year = ?, description = ?, cover_image = ?, genre_id = ?
      WHERE id = ?
    `;
    db.query(sql, [title, developer, release_year, description, cover_image, genre_id, id], (err) => {
      if (err) {
        console.error('Error updating game:', err);
        return res.status(500).json({ error: 'Failed to update game' });
      }
      res.json({ message: 'Game updated successfully' });
    });
  } else {
    // No new image — update all fields except cover_image so the old one is preserved
    const sql = `
      UPDATE games
      SET title = ?, developer = ?, release_year = ?, description = ?, genre_id = ?
      WHERE id = ?
    `;
    db.query(sql, [title, developer, release_year, description, genre_id, id], (err) => {
      if (err) {
        console.error('Error updating game:', err);
        return res.status(500).json({ error: 'Failed to update game' });
      }
      res.json({ message: 'Game updated successfully' });
    });
  }
});

// DELETE /games/:id — permanently removes a game from the database by its id
gamesRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM games WHERE id = ?';

  db.query(sql, [id], (err) => {
    if (err) {
      console.error('Error deleting game:', err);
      return res.status(500).json({ error: 'Failed to delete game' });
    }
    res.json({ message: 'Game deleted successfully' });
  });
});

module.exports = gamesRouter;
