module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "docker",
  password: "docker",
  database: "postgres",
  operatorAliases: false,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true
  }
};
