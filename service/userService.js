const { creatUsersModel } = require('../model/userModel');

const alert = (message = 'Invalid entries. Try again.', status = 400) => ({
  err: {
    message,
  },
  status,
});

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validation = (email, name, password) => {
  if (!name || !email || !password) return true;
};
const validateCreateService = async (name, email, password, role) => {

  const user = await creatUsersModel(name, email, password, role);

  if (user === 'Already exists') return alert('Email already registered', 409);
  
  if (validation(email, name, password)) return alert(undefined, 400);

  if (!validateEmail(email)) return alert(undefined, 400);
  return { user }; 
};

module.exports = {
  validateCreateService,
};