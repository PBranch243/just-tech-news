//import the Sequelize constructor from the library
const Sequelize = require('sequelize');
//use dotenv to shield environment variables
require('dotenv').config();

// create connection to our db (comment our following to replace with project code and see if app breaks)
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
//   host: 'localhost',
//   dialect: 'mysql',
//   port: 3306
// });
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PW,
      {
          host: 'localhost',
          dialect: 'mysql',
          port: 3306
      }
  )
};

module.exports = sequelize;