const Sequelize = require('sequelize')

const connection = new Sequelize('blogAdmin', 'root', false,{
    host: 'localhost',
    dialect: 'mysql',
    }
);

module.exports = connection;