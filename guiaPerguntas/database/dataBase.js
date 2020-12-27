const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'root',false,{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
