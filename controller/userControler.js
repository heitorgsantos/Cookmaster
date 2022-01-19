const { validateCreateService, findUserService } = require('../service/userService');

const createUserController = async (req, res, _next) => {
  const { email, name, password, role } = req.body;
  try {
    const { err, status, user } = await validateCreateService(name, email, password, role);
    if (err) return res.status(status).json(err);
    return res.status(201).json({ user });
  } catch (error) {
    return error.message;
  }
};

const findUserController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await findUserService(email, password);
    console.log(token, 'entrou no controller');
     if (token.err) return res.status(token.status).json(token.err);
    return res.status(200).json(token);
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  createUserController,
  findUserController,
};