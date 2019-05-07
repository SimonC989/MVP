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
    .catch(err => res.sendStatus(404).end(err));
});

app.get('/players', (req, res) => {
  const { game } = req.query;
  ScoreBoard.find({ game: game})
    .then(players => res.send(players))
    .catch(err => res.sendStatus(404).end(err));
});

app.post('/addPlayer', (req, res) => {
  const { name } = req.body;
  const { title } = req.body
  const score = {
    name: name,
    game: title,
    wins: 0,
    good: 0,
    evil: 0,
  }
  ScoreBoard.create(score)
    .then(() => res.sendStatus(201))
    .catch(err => res.sendStatus(404).end(err));
});

app.delete('/removePlayer', (req, res) => {
  const player = req.body.name;
  ScoreBoard.deleteOne({ name: player })
    .then(() => res.send(202))
    .catch(err => res.sendStatus(404).end(err));
});

app.patch('/updateScore', (req, res) => {
  const { name, column, game, count } = req.body;
  ScoreBoard.findOneAndUpdate({ name: name, game: game}, { [column]: count })
    .then(() => res.send(202))
    .catch(err => res.sendStatus(404).end(err));
});