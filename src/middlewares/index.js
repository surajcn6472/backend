const authenticationMiddleware = require('./authentication');
const guestMiddleware = require('./guest');

module.exports = {
  authenticationMiddleware,
  guestMiddleware,
};