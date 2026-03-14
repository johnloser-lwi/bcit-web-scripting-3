// Genres router — handles all requests to /genres
// The only route is GET /genres, which returns all genres for dropdowns and filters

const express = require('express');
const genresRouter = express.Router();
const db = require('../db');

// GET /genres — fetch every genre from the database sorted alphabetically
// The React frontend uses this to populate the GenreFilter dropdown
// and the genre <select> inside the Add/Edit game forms
genresRouter.get('/', (req, res) => {
  const sql = 'SELECT * FROM genres ORDER BY name';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching genres:', err);
      return res.status(500).json({ error: 'Failed to fetch genres' });
    }
    res.json(results);
  });
});

module.exports = genresRouter;
