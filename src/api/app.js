const express = require('express');
const path = require('path');
const uploads = require('../config/multer');
const { 
  createUserController,
   findUserController, 
   insertRecipesController, 
   findRecipesController, 
   findIdController, 
   deleteOneIdController, 
   editRecipesController, 
   imagesController } = require('../controller/userControler');
const { auth, withOutLogin } = require('../middlewares/auth');

const app = express();
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '..', '/uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', createUserController);

app.post('/login', findUserController);

app.post('/recipes', auth, insertRecipesController);

app.get('/recipes', withOutLogin, findRecipesController);

app.get('/recipes/:id', withOutLogin, findIdController);

app.put('/recipes/:id', auth, editRecipesController);

app.delete('/recipes/:id', auth, deleteOneIdController);

app.put('/recipes/:id/image/', auth, uploads, imagesController);

// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
