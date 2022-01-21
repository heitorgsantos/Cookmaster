const authService = require('../service/authService');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'missing auth token' });
    const user = authService.verifyToken(authorization);
    if (!user) return res.status(401).json({ message: 'jwt malformed' });
    req.user = user;
    console.log(user, 'user auth');
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Falha na autenticação' });
  }
};