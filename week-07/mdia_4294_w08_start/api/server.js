
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'music_db_user',
  password: 'password',
  database: 'music',
  port: 8889
});

app.get('/albums', (req, res) => {
  //const sql = `SELECT albums.*, artists.name as artist FROM (albums JOIN artists ON albums.artist = artists.id)`;
  const sql = `SELECT *, artists.name as artist FROM (albums JOIN artists ON albums.artist = artists.id)`;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching albums:', error);
      res.status(500).json({ error: 'Failed to fetch albums' });
    } else {
      res.json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
});