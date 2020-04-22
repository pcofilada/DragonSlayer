var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
