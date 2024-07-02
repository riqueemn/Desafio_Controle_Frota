const Sequelize = require('sequelize')
const sequelize = new Sequelize('database_development', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306'
})

module.exports = sequelize;