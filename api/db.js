var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(
  `mongodb://${config.dbUser}:${config.dbPassword}@ds163705.mlab.com:63705/dragonslayer`
);
