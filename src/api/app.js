const express = require('express');
const { createUserController, findUserController } = require('../../controller/userControler');

const app = express();
app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', createUserController);

app.post('/login', findUserController);

// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
