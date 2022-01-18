const express = require('express');
const { createUserController } = require('../../controller/userControler');

const app = express();
app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', createUserController);

// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
