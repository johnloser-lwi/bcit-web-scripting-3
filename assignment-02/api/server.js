const express = require('express');
const cors = require('cors');
const gamesRouter = require('./routers/games');
const genresRouter = require('./routers/genres');

const app = express();
const PORT = 3000;

// register the static assets
app.use(express.static('public'));
// allow react app to talk to the server without being blocked by the browser
app.use(cors());
// use express.json to simplify the parsing of json data
app.use(express.json());

// register the 2 routers created
app.use('/games', gamesRouter);
app.use('/genres', genresRouter);

// start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
