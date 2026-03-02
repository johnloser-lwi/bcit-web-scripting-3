
const express = require('express');
const albumsRouter = express.Router();
const db = require("../db");
const upload = require('../storage');

albumsRouter.get('/', (req, res) => {
  //const sql = `SELECT albums.*, artists.name as artist FROM (albums JOIN artists ON albums.artist = artists.id)`;
  const sql = `SELECT *, artists.name as artist FROM (albums JOIN artists ON albums.artist = artists.id)`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching albums:', error);
      res.status(500).json({ error: 'Failed to fetch albums' });
    } else {
      res.json(results);
    }
  });
});

albumsRouter.post('/', upload.single('image'), (req, res) => {
    const {artist, title} = req.body;

    const image = req.file.filename;

    const addAlbumSql = "INSERT INTO albums (artist, title, image_name) VALUES (?, ?, ?)"

    db.query(addAlbumSql, [artist, title, image], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({error: "Server error"});
        }

        res.status(200).json({message: "Album added successfully: " + title});
    });
});

module.exports = albumsRouter;