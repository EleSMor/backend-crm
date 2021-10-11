const express = require('express');
const app = express();

app.get('/', (res,send) => res.send('Hello world'));

PORT = 3000;
app.listen(PORT);

console.log('Server on port', PORT);