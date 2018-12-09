var Sequelize = require('sequelize');
var yourDB = "postgresql://openpg:openpgpwd@localhost:5432/mini-fb?ssl=true";
var sequelize = new Sequelize(yourDB, {
    dialect: 'postgres',
    dialectOptions: {
       /* ssl: {
            require: true
        }*/
    }
});

module.exports = sequelize;