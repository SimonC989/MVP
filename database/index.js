const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost/boardgame';

let db = mongoose.connect(mongoUri);
db = mongoose.connection;

module.exports = db;
