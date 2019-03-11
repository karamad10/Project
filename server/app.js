const express = require('express');
const apiRouter = require('./control/apiRouters');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// app.use(function(req, res, next) {
//   return res.status(404).send({ message: 'Route' + req.url + ' Not found.' });
// });

// app.use(function(err, req, res, next) {
//   return res.status(500).send({ error: err });
// });

module.exports = app;
