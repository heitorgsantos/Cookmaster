const authService = require('../service/authService');

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const error = { status: 401, message: 'missing auth token' };
    const error2 = { status: 401, message: 'jwt malformed' };
    if (!authorization) throw error;
    //  res.status(401).json({ message: 'missing auth token' });
    const user = authService.verifyToken(authorization);
    if (!user) throw error2;
    req.user = user;
    next();
  } catch (error) {
    // return res.status(401).json({ message: 'Falha na autenticação' });
    return res.status(error.status).json(error.message);
  }
};

const withOutLogin = (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    const user = authService.verifyToken(authorization);
    req.user = user;
    next();
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  auth,
  withOutLogin,
 
};