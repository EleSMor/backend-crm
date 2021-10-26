const express = require('express');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

app.use(require('./routes/index.routes'))
module.exports = app;