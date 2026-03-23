require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db');
const PORT = 3000;

const userRouter = require('./routers/users');
const tapesRouter = require('./routers/tapes');
const artistRouter = require('./routers/artists');

// use the cors package to enable cross-origin resource sharing
// *****NOTE: Using this statement without any parameters allows ANYONE from ANYWHERE to access our files. This is fine when we use a local host, because no one can access it outside our physical computer, but on a live site hosted on the web this is dangerous!
app.use(cors());
// Tells the server which folder to serve static files (our images) from
app.use(express.static('public'));
app.use(express.json());           // parses JSON bodies
app.use(express.urlencoded({ extended: true })); // parses form data

app.use('/tapes', tapesRouter);
app.use('/artists', artistRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
});


