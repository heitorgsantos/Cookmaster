const { 
  validateCreateService, 
  findUserService, 
  insertRecipesService, 
  findRecipesService, 
  findOneService, 
  editRecipesService, 
  deleteOneIdService, 
  imagesService,
   } = require('../service/userService');

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
    const { err, status, findRecipes } = await insertRecipesService(name, 
      ingredients, preparation, user);
    if (err) return res.status(status).json(err);
    return res.status(201).json(findRecipes);
  } catch (error) {
    return error.message;
  }
};

// listagem de receitas RECIPES
const findRecipesController = async (_req, res) => {
  try {
    const { findRecipes } = await findRecipesService();
    return res.status(200).json(findRecipes);
  } catch (error) {
    return error.message;
  }
};

const findIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const { err, status, findId } = await findOneService(id);
    if (err) return res.status(status).json(err);
    return res.status(200).json(findId);
  } catch (error) {
    return error.message;
  }
};

const editRecipesController = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await editRecipesService(id, req.body);
    return res.status(200).json(recipe);
  } catch (error) {
    return error.message;
  }
};

const deleteOneIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await deleteOneIdService(id);
    return res.status(204).json(recipe);
  } catch (error) {
    return error.message;
  }
};

const imagesController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { filename } = req.file;
    const imageRecipe = await imagesService(id, filename);
    return res.status(200).json(imageRecipe);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUserController,
  findUserController,
  insertRecipesController,
  findRecipesController,
  findIdController,
  editRecipesController,
  deleteOneIdController,
  imagesController,
};