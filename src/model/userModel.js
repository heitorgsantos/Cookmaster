const { ObjectId } = require('mongodb');
const connect = require('./connection');

const creatUsersModel = async (name, email, password, role = 'user') => {
  const conn = await connect();
  const emailValidate = await conn.collection('users').findOne({ email });
  if (emailValidate) return 'Already exists';
  const user = await conn.collection('users')
  .insertOne({ name, email, password, role });
  return {
    name, 
    email,
    role,
    _id: user.insertedId,
  };
};

const findUserModel = async (email, _password) => {
  const conn = await connect();
  const findUser = await conn.collection('users').findOne({ email, _password });
  if (!findUser) return 'Incorrect username or password';
  return findUser;
};

const insertRecipesModel = async (name, ingredients, preparation, user) => {
  const conn = await connect();
  const { _id } = user; 
  const insertRecipes = await conn.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId: _id });
  return { recipe: {
    name,
    ingredients,
    preparation,
    userId: _id,
    _id: insertRecipes.insertedId,
  },
  };
};

// listagem de receitas RECIPES

const findRecipesModel = async () => {
  const conn = await connect();
  const findRecipes = await conn.collection('recipes').find({}).toArray();
  
  return findRecipes;
};

const findOneRecipesModel = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const conn = await connect();
  const findId = await conn.collection('recipes').findOne({ _id: ObjectId(id) });
  return findId;
};

const editRecipesModel = async (id, recipe) => {
  // if (!ObjectId.isValid(id)) return null;
  const conn = await connect();
  console.log(recipe, 'entrou recipe');
  await conn.collection('recipes').updateOne({ _id: id }, { $set: { ...recipe } });
};

const deleteOneIdModel = async (id) => {
  const conn = connect();
   (await conn).collection('recipes').deleteOne({ _id: id });
};

module.exports = {
  creatUsersModel,
  findUserModel,
  insertRecipesModel,
  findRecipesModel,
  findOneRecipesModel,
  editRecipesModel,
  deleteOneIdModel,
};
