const express = require('express');
const { 
  createUserController,
   findUserController, 
   insertRecipesController, 
   findRecipesController, 
   findIdController } = require('../controller/userControler');
const { auth, withOutLogin } = require('../middlewares/auth');

const app = express();
app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', createUserController);

app.post('/login', findUserController);

app.post('/recipes', auth, insertRecipesController);

app.get('/recipes', withOutLogin, findRecipesController);

app.get('/recipes/:id', withOutLogin, findIdController);

// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
