const mongoose = require('mongoose');
const db = require('./index.js');

mongoose.Promise = global.Promise;

db.on('error', console.log.bind(console, 'connection error'));
db.once('open', () => (console.log('DB connected~')));

const scoreSchema = new mongoose.Schema({
  name: String,
  game: String,
  wins: Number,
  good: Number,
  evil: Number,
});

const gameSchema = new mongoose.Schema({
  name: String,
  year: Number,
  minPlayers: Number,
  maxPlayers: Number,
  description: String,
  imageUrl: String,
  officialUrl: String,
  rulesUrl: String
});

const playerSchema = new mongoose.Schema({
  name: String
});

const ScoreBoard = mongoose.model('ScoreBoard', scoreSchema);
const GameDetail = mongoose.model('GameDetail', gameSchema);
const Players = mongoose.model('Players', playerSchema);

module.exports.ScoreBoard = ScoreBoard;
module.exports.GameDetail = GameDetail;
module.exports.Players = Players;
