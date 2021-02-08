const dbConfig = require("../config/db.config.js");
const mysql = require("mysql2/promise");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const host = dbConfig.HOST;
  const port = dbConfig.PORT;
  const user = dbConfig.USER;
  const password = dbConfig.PASSWORD;
  const database = dbConfig.DB;
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
      host: dbConfig.HOST,
      port: dbConfig.PORT,
      dialect: dbConfig.dialect,
      operatorsAliases: false,

      pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
      },
    }
  );

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  // init models and add them to the exported db object
  db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

  // sync all models with database
  await sequelize.sync();
}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

module.exports = db;
