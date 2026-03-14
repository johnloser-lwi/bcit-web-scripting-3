const express = require('express');
const genresRouter = express.Router();
const db = require('../db');

// get genre
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
