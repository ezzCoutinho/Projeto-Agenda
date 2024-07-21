const path = require("path");

const Contato = require(path.resolve(__dirname, '..', 'models', 'ContatoModel.js'));

module.exports.index = async (req, res, next) => {
    const contatos = await Contato.buscaContatos();
    res.render('index', {contatos});
};

