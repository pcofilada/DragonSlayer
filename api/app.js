var express = require('express');
var app = express();
var cors = require('cors');
var db = require('./db');

app.use(cors());

var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

var GameController = require('./game/GameController');
app.use('/api/games', GameController);

module.exports = app;
