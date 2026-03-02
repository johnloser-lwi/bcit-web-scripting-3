
const express = require('express');
const cors = require('cors');
const albumsRouter = require('./routers/albums');
const artistsRouter = require('./routers/artists');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(cors());

app.use('/albums', albumsRouter);
app.use('/artists', artistsRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
});