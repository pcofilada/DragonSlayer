var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Game = require('./Game');
var VerifyToken = require('../auth/VerifyToken');

router.get('/', VerifyToken, function(req, res) {
  Game.find({ userId: req.userId }, function(err, games) {
    if (err)
      return res.status(500).send('There was a problem finding the games.');
    res.status(200).send(games);
  });
});

router.post('/', VerifyToken, function(req, res) {
  Game.create(
    {
      uuid: req.body.uuid,
      health: req.body.health,
      opponentHealth: req.body.opponentHealth,
      logs: req.body.logs,
      userId: req.userId
    },
    function(err, game) {
      if (err)
        return res
          .status(500)
          .send('There was a problem adding the information to the database.');
      res.status(200).send(game);
    }
  );
});

router.get('/:uuid', VerifyToken, function(req, res) {
  Game.findOne({ uuid: req.params.uuid, userId: req.userId }, function(
    err,
    game
  ) {
    if (err)
      return res.status(500).send('There was a problem finding the game.');
    if (!game) return res.status(404).send('No game found.');
    res.status(200).send(game);
  });
});

router.delete('/', function(req, res) {
  Game.deleteMany({}, function(err, games) {
    if (err) return res.status(500).send('There was a problem deleting games.');
    res.status(200).send(games);
  });
});

module.exports = router;
