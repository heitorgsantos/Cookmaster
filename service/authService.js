const jwt = require('jsonwebtoken');

const API_SECRET = 'JHKASDASHJASSDHJNCJUW';

const JWT_CONFIG = {
  expiresIn: 3600,
  algorithm: 'HS256',
};

const genToken = (data) => jwt.sign({ data }, API_SECRET, JWT_CONFIG);

module.exports = {
  genToken,
};