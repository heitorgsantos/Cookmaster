const { validateCreateService } = require('../service/userService');

const createUserController = async (req, res, _next) => {
  const { email, name, password, role } = req.body;
  console.log(name, password, email, 'entrou no req');
  try {
    const { err, status, user } = await validateCreateService(name, email, password, role);
    if (err) return res.status(status).json(err);
    return res.status(201).json({ user });
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  createUserController,
};