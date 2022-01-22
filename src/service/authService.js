const jwt = require('jsonwebtoken');

const API_SECRET = 'JHKASDASHJASSDHJNCJUW';

const JWT_CONFIG = {
  expiresIn: 3600,
  algorithm: 'HS256',
};

const genToken = (data) => jwt.sign({ data }, API_SECRET, JWT_CONFIG);

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, API_SECRET);
    const name = decoded.data;
    return name;
  } catch (error) {
    return null;
  }
};

module.exports = {
  genToken,
  verifyToken, 
};