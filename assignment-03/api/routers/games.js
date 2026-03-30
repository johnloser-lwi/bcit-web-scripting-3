const express = require('express');
const gamesRouter = express.Router();
const db = require('../db');
const upload = require('../storage');
const authenticateToken = require('../auth');

// protect all game routes, a valid jwt token is required for every request
gamesRouter.use(authenticateToken);

// get games
gamesRouter.get('/', (req, res) => {
  // parse the url to get the genre_id: http://localhost:3000/games?genre_id=${selectedGenreId}
  const { genre_id } = req.query;

  // display the genre with its name instead of id by joining the tables
  let sql = `
    SELECT games.*, genres.name AS genre
    FROM games
    JOIN genres ON games.genre_id = genres.id
  `;

  // extract the params here so we can dynamically add the value into the query list
  const params = [];

  // if there's genre_id in the url add the genere id query to the sql
  // ? is a placeholder which will be replaced by the values in the params
  if (genre_id) {
    sql += ' WHERE games.genre_id = ?';
    params.push(genre_id);
  }

  // order by title
  sql += ' ORDER BY games.title';

  // run the sql, add params to replace ? in the sql string
  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error fetching games:', err);
      return res.status(500).json({ error: 'Failed to fetch games' });
    }
    res.json(results);
  });
});

// get game by id, used for display individual title
gamesRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  // display genre name instead of id
  const sql = `
    SELECT games.*, genres.name AS genre
    FROM games
    JOIN genres ON games.genre_id = genres.id
    WHERE games.id = ?
  `;

  // replace ? in the sql with id parsed from the params
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching game:', err);
      return res.status(500).json({ error: 'Failed to fetch game' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Game not found' });
    }

    // get the first result from the list (there can only be 1 result)
    res.json(results[0]);
  });
});


// add game
gamesRouter.post('/', upload.single('cover_image'), (req, res) => {
  const { title, developer, release_year, description, genre_id } = req.body;

  // if there's a file in the request, use filename, otherwise set it to null
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

// change game info
gamesRouter.put('/:id', upload.single('cover_image'), (req, res) => {
  const { id } = req.params;
  const { title, developer, release_year, description, genre_id } = req.body;

  // if there's a file, handle file upload
  if (req.file) {
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

// delete game from database
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
