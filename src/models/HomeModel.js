const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
    titulo: { type: String, required: true},
    descricao: String
});

const HomeModel = mongoose.model('Home', HomeSchema);
const ContatoModel = mongoose.model('Contatos', HomeSchema);

module.exports = HomeModel;
module.exports = ContatoModel;