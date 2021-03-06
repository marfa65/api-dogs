require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const path = require("path");
const fs = require("fs");

const { DB_USER, DB_PASSWORD, DB_HOST, PORT } = process.env;

function dbConection() {
  let connection_DB = null;

  if (process.env.DATABASE_URL) {
    // verifying if exist herolku env
    console.log("CONECCION DB HEROKU");
    connection_DB = new Sequelize(process.env.DATABASE_URL, {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    });
  } else {
    console.log("CONECCION DB LOCAL ");
    connection_DB = new Sequelize(
      `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${PORT}/dogs`,
      {
        logging: false, // set to console.log to see the raw SQL queries
        native: false, // lets Sequelize know we can use pg-native for ~30% more speed
      }
    );
  }
  return connection_DB;
}
const sequelize = dbConection();

// connecting DB
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Breed, Temperament } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Breed.belongsToMany(Temperament, { through: "breedTemperament" });
Temperament.belongsToMany(Breed, { through: "breedTemperament" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos as??: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexi??n { conn } = require('./db.js');
  Op,
};
