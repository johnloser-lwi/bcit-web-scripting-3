
const express = require('express');
const artistsRouter = express.Router();
const db = require("../db");

artistsRouter.get('/', (req, res) => {
  //const sql = `SELECT albums.*, artists.name as artist FROM (albums JOIN artists ON albums.artist = artists.id)`;
  const sql = `SELECT * FROM artists`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching albums:', error);
      res.status(500).json({ error: 'Failed to fetch albums' });
    } else {
      res.json(results);
    }
  });
});

module.exports = artistsRouter;