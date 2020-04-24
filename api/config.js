const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  secret: process.env.SECRET_KEY,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD
};
