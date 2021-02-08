module.exports = {
  HOST: "db",
  PORT: "3306",
  USER: "root",
  PASSWORD: "password",
  DB: "testdbdocker",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
