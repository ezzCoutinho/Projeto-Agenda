import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/css/style.css';

import Login from './modules/Login';
const nome = new Login('.form-nome');
const register = new Login('.form-cadastro');
const login = new Login('.form-login');
nome.init();
register.init();
login.init();

import Contato from './modules/Contato';
const criarContato = new Contato('.formCadastro');
criarContato.init();

