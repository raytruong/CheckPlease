const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');

mongoose.connect('localhost:27017/data');

app.use('/', routes);

const port = 8080;
app.listen(port, () => {
  console.log(`serving on port ${port}`);
});
