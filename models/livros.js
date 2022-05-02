const Sequelize = require('sequelize');
const connection = require('../database/database');
const Autor = require('./autores');
const Genero = require('./generos');
const Editora = require('./editoras');

const Livro = connection.define('livros', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    paginas: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Livro.belongsTo(Autor);
Livro.belongsTo(Editora);
Livro.belongsTo(Genero);

//Livro.sync({force: true});

module.exports = Livro;