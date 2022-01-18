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

module.exports = {
  creatUsersModel,
};