module.exports.middlewareNomeSobrenome = (req, res, next) => {
    console.log();
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    console.log('>Middleware Global<!');;
    console.log();
    next();
};

module.exports.checkCSRFError = (error, req, res, next) => {
    if(error) {
        return res.render('404');
    }

    next();

};

module.exports.csrfMiddleware =(req, res, next) => {

    res.locals.csrfToken = req.csrfToken();

    next();
};

module.exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'Você precisa fazer login.');
        req.session.save(() => { res.redirect('http://localhost:3000/login/index');
            return;
        })
        return;
    }
    next();
};