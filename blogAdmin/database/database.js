const Sequelize = require('sequelize')

const connection = new Sequelize('blogadmin', 'carlosdev', 'kk55ff44',{
        host: 'mysql742.umbler.com',
         dialect: 'mysql',
        timezone: "-03:00"
    }
);

module.exports = connection;