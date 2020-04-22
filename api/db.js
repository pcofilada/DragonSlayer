var mongoose = require('mongoose');
mongoose.connect(
  'mongodb://dragonslayer:patrick1993@dragonslayer-shard-00-00-bvewd.mongodb.net:27017,dragonslayer-shard-00-01-bvewd.mongodb.net:27017,dragonslayer-shard-00-02-bvewd.mongodb.net:27017/test?ssl=true&replicaSet=DragonSlayer-shard-0&authSource=admin&retryWrites=true&w=majority'
);
