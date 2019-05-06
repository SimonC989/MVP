const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { ScoreBoard, GameDetail, Players } = require('../database/model.js')

const app = express();
const port = 3667;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => {
  console.log(`Port ${port} ~ Scoreboard`);
});

app.get('/all', (req, res) => {
  GameDetail.find()
    .then(data => res.send(data))
    .catch(err => res.status(404).end(err));
});

app.get('/players', (req, res) => {
  Players.find()
    .then(players => res.send(players))
    .catch(err => res.status(404).end(err));
});

app.post('/addPlayer', (req, res) => {
  const player = req.body.name;
  Players.create({ name: player })
    .then(() => res.sendStatus(201))
    .catch(err => res.status(404).end(err));
});

app.delete('/removePlayer', (req, res) => {
  const player = req.body.name;
  Players.deleteOne({ name: player })
    .then(() => res.send(202))
    .catch(err => res.status(404).end(err));
});