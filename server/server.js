const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const db = require('./db/conn');

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// API routes
app.use('/api', require(path.join(__dirname, 'routes/records.js')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(port, () => {
  db.connectDB();
  console.log("Listening on port: " + port);
});
