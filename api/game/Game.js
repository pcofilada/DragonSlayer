var mongoose = require('mongoose');
var GameSchema = new mongoose.Schema({
  uuid: String,
  health: Number,
  opponentHealth: Number,
  logs: [{ attacker: String, opponent: String, action: String, value: Number }],
  userId: String
});
mongoose.model('Game', GameSchema);

module.exports = mongoose.model('Game');
