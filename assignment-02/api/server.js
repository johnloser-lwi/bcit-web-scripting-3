// Main Express server entry point for the Video Games Collection API
// Sets up all middleware and mounts the games and genres routers

const express = require('express');
const cors = require('cors');
const gamesRouter = require('./routers/games');
const genresRouter = require('./routers/genres');

const app = express();
const PORT = 3000;

// Serve the public/ folder as static files so the React app can load
// uploaded cover images via http://localhost:3000/images/<filename>
app.use(express.static('public'));

// Allow cross-origin requests from the React dev server (running on port 5173)
app.use(cors());

// Parse incoming JSON request bodies — needed for JSON-encoded PUT/POST bodies
app.use(express.json());

// Mount the routers: all /games routes go to gamesRouter, /genres to genresRouter
app.use('/games', gamesRouter);
app.use('/genres', genresRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
