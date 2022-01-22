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
  console.log(findUser, 'entrou no model');
  return findUser;
};

const insertRecipesModel = async (name, ingredients, preparation, user) => {
  const conn = await connect();
  const { _id } = user; 
  console.log(_id);
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
  
  console.log(findRecipes, 'entrou findRecipes');
  return findRecipes;
};

module.exports = {
  creatUsersModel,
  findUserModel,
  insertRecipesModel,
  findRecipesModel,
};
