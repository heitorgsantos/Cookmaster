const { ObjectId } = require('mongodb');
const { creatUsersModel,
   findUserModel, 
   insertRecipesModel, 
   findRecipesModel, 
   findOneRecipesModel, 
   editRecipesModel, 
   deleteOneIdModel, 
   imagesModel } = require('../model/userModel');
const authService = require('./authService');

// função de erro
const alert = (message = 'Invalid entries. Try again.', status = 400) => ({
  err: {
    message,
  },
  status,
});

// função para validar email
const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);  
};
// função para validar dados
const validation = (email, name, password) => {
  if (!name || !email || !password) return true;
};
const validRecipes = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return true;
};

// const validationTwo = (email, password) => {
//   if (!email || !password) return true;
// };

const validateCreateService = async (name, email, password, role) => {
  const user = await creatUsersModel(name, email, password, role);

  if (user === 'Already exists') return alert('Email already registered', 409);

  if (validation(email, name, password)) return alert(undefined, 400);

  if (!validateEmail(email)) return alert(undefined, 400);
  return { user }; 
};

const findUserService = async (email, password) => {
  if (!email || !password) return alert('All fields must be filled', 401);

  const findUser = await findUserModel(email);

  if (findUser.email !== email || findUser.password !== password) {
    return alert('Incorrect username or password', 401);
  }

  const { password: _password, ...userLog } = findUser;
  
  const token = authService.genToken(userLog);

  return { token };
};

const insertRecipesService = async (name, ingredients, preparation, user) => {
  const findRecipes = await insertRecipesModel(name, ingredients, preparation, user);
  if (!name || !ingredients || !preparation) return alert('Invalid entries. Try again.', 400);
  return { findRecipes };
};

// listagem de receitas RECIPES

const findRecipesService = async () => {
  const findRecipes = await findRecipesModel();
  return { findRecipes };
};

const findOneService = async (id) => {
  const findId = await findOneRecipesModel(id);
  if (!findId) return alert('recipe not found', 404);
  return { findId };
};

const editRecipesService = async (id, recipe) => {
  if (!ObjectId.isValid(id)) alert('recipe not found', 404);
  if (validRecipes(recipe)) alert('Invalid entries. Tray again.', 401);
  const recipes = await editRecipesModel(id, recipe);
  return recipes; 
};

const deleteOneIdService = async (id) => {
  if (!ObjectId.isValid(id)) return alert('recipe not found', 401);
  await deleteOneIdModel(ObjectId(id));
};

const imagesService = async (id, filename) => {
  const URL = `localhost:3000/src/uploads/${filename}`;
  if (!ObjectId.isValid(id)) return alert('not found', 401);
  const imageRecipe = await imagesModel(id, URL);
  return imageRecipe;
};

module.exports = {
  validateCreateService,
  findUserService,
  insertRecipesService,
  findRecipesService,
  findOneService,
  editRecipesService,
  deleteOneIdService,
  imagesService,
};
