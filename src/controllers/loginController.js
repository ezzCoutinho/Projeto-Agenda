const path = require('path');
const Login = require(path.resolve(__dirname, '..', 'models', 'loginModel'));

module.exports.index = (req, res, next) => {    
    if(req.session.user) return res.render('login-logado')
    return res.render('login');
};

module.exports.register = async (req, res, next) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('http://localhost:3000/login/index');
            });
            return;
        }

        req.flash('success', 'Seu usuário foi criado com sucesso');
        req.session.save(function () {
            return res.redirect('http://localhost:3000/login/index');
        })
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('http://localhost:3000/login/index');
            });
            return;
        }

        req.flash('success', 'Você entrou no sistema');
        req.session.user = login.user;
        req.session.save(function () {
            return res.redirect('http://localhost:3000/login/index');
        })
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}

module.exports.logout = (req, res, next) => {
    req.session.destroy();
    res.redirect('http://localhost:3000/login/index')
}