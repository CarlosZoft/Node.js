const Sequelize = require('sequelize')

const connection = new Sequelize('blogAdmin', 'root', false,{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
    }
);

module.exports = connection;