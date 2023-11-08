const express = require('express');
const routes = require('./routes');
const mysql = require("mysql2");
// import sequelize connection
const sequelize = require('./config/connection');

const connection = mysql.createConnection({
  host: "localhost",
  port: 3001,
  user: "root",
  password: "Phillies_21",
  database: "ecommerce_db;",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database!");
  
  start();
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
  })
});
