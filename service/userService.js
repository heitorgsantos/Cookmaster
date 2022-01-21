const { creatUsersModel, findUserModel, insertRecipesModel } = require('../model/userModel');
const authService = require('./authService');

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
  const recipes = await insertRecipesModel(name, ingredients, preparation, user);
  if (!name || !ingredients || !preparation) return alert('Invalid entries. Try again.', 400);
  return { recipes };
};
module.exports = {
  validateCreateService,
  findUserService,
  insertRecipesService,
};
