const path = require('path');
const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require(path.resolve(__dirname, 'src', 'controllers', 'loginController.js'));
const contatosController = require(path.resolve(__dirname, 'src', 'controllers', 'contatosController'));
const {loginRequired} = require(path.resolve(__dirname, 'src', 'middlewares', 'middlewares'));

// Rotas da home
route.get('/', homeController.index);

// Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// Rotas de contato
route.get('/contato/index/', loginRequired, contatosController.index);
route.post('/contato/register', loginRequired, contatosController.register);
route.get('/contato/index/:id', loginRequired, contatosController.editIndex);
route.post('/contato/edit/:id', loginRequired, contatosController.edit);
route.get('/contato/delete/:id', loginRequired, contatosController.delete);

module.exports = route;
