// import dependencies and initialize express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const indexRoutes = require('./routes/index-route.js');

const app = express();

// enable parsing of http request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// access to static files
app.use(express.static(path.join('public')));

// routes and api calls
app.use('/', indexRoutes);

// start node server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App UI available http://localhost:${port}`);
});

// error handler for unmatched routes or api calls
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
});

module.exports = app;
