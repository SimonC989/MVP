const express = require('express');
const path = require('path');

const app = express();
const port = 3667;

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => {
  console.log(`Port ${port} ~ Scoreboard`);
});
