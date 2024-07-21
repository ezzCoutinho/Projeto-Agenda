require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log('Conexão foi estabelecida: BASE DE DADOS');
        app.emit('pronto');
    })
    .catch(error => {
        console.error('ERROR: ', error);
    });

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const porta = 3000;
const path = require('path');
const routes = require(path.resolve(__dirname, 'routes.js'));
const middlewareGlobal = require(path.resolve(__dirname, 'src', 'middlewares', 'middlewares.js'));
const helmet = require('helmet');
const csrf = require('csurf');

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret:process.env.COOKIE_SECRET,
    store: new MongoStore({mongoUrl: process.env.CONNECTIONSTRING}),
    resave:false,
    saveUninitialized:false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(middlewareGlobal.middlewareNomeSobrenome);
app.use(middlewareGlobal.checkCSRFError);
app.use(middlewareGlobal.csrfMiddleware);


app.use(routes);

app.on('pronto', () => {
    app.listen(porta, () => {
        console.log(`Clique para acessar o servidor local: http://localhost:${porta}`);
        console.log(`Servidor sendo executado na porta ${porta}`);
    });
});
