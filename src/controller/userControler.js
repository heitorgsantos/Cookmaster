const { 
  validateCreateService, 
  findUserService, 
  insertRecipesService, 
  findRecipesService } = require('../service/userService');

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

// login usuário
const findUserController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await findUserService(email, password);
     if (token.err) return res.status(token.status).json(token.err);
    return res.status(200).json(token);
  } catch (error) {
    return error.message;
  }
};

const insertRecipesController = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { user } = req;
  console.log(user, 'entrou no user');

  try {
    const { err, status, recipes } = await insertRecipesService(name, 
      ingredients, preparation, user);
    if (err) return res.status(status).json(err);
    return res.status(201).json(recipes);
  } catch (error) {
    return error.message;
  }
};

// listagem de receitas RECIPES
const findRecipesController = async (_req, res) => {
  try {
    const { findRecipes } = await findRecipesService();
    console.log(findRecipes, 'controller');
    return res.status(200).json(findRecipes);
  } catch (error) {
    return error.message;
  }
};
module.exports = {
  createUserController,
  findUserController,
  insertRecipesController,
  findRecipesController,
};