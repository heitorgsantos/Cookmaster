const express = require('express');
const { 
  createUserController,
   findUserController, 
   insertRecipesController } = require('../../controller/userControler');
const auth = require('../../middlewares/auth');

const app = express();
app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', createUserController);

app.post('/login', findUserController);

app.post('/recipes', auth, insertRecipesController);

// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
