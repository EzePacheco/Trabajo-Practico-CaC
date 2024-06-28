const mysql = require("mysql2");

// Creación de conexión con servidor SQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

connection.connect((error) => {
  if (error) {
    console.error(`Error de conexión con servidor SQL: ${error}`);
    return;
  }

  // Consulta para crear la db en caso de que no exista, sino, va a posicionarse en ella.
  const sqlCreateDB = "CREATE DATABASE IF NOT EXISTS mundo_eventos";

  // Pasamos la consulta a la conexión SQL
  connection.query(sqlCreateDB, (error, result) => {
    if (error) {
      console.error(`Error de conexion con el servidor: ${error}`);
      return;
    }

    // Consulta OK:
    console.log(
      "Base de datos 'mundo_eventos' creada o seleccionada correctamente"
    );

    // Creacion de tablas:
    connection.changeUser(
      {
        database: "mundo_eventos",
      },
      (error) => {
        if (error) {
          console.error(`Error al cambiar a la database ${database}: ${error}`);
          return;
        }

        console.log("Conectado a la base de datos 'mundo_eventos'");

        // Consultas de creación de tablas.
        const createTableUsers = `
        CREATE TABLE IF NOT EXISTS users(
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(45) NOT NULL,
        password VARCHAR(45) NOT NULL
        );`;

        const createTableEvents = `CREATE TABLE IF NOT EXISTS events(
        event_id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(50) NOT NULL,
        date DATE NOT NULL,
        hour TIME NOT NULL,
        place_name VARCHAR(100),
        street VARCHAR(100) NOT NULL,
        city VARCHAR(100) NOT NULL,
        description TEXT,
        image VARCHAR(255),
        user_id INT,
        category_id INT,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (category_id) REFERENCES categories(category_id)
        );`;

        const createTableCategories = `
        CREATE TABLE IF NOT EXISTS categories(
        category_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL);
        `;

        const insertValuesCategories = `INSERT INTO categories(name) VALUES ('Arte y Entretenimiento'), ('Deporte'), ('Música'), ('Educativo'), ('Gastronomia'), ('Gaming'), ('Corporativo')`;

        // Pasamos las consultas de creación de tablas individualmente.
        connection.query(createTableUsers, (error, result) => {
          if (error) {
            console.error(`Error al crear la tabla Users: ${error}`);
            return;
          }

          // Exito:
          console.log("Tabla creada con exito!");
        });

        connection.query(createTableCategories, (error, result) => {
          if (error) {
            console.error(`Error al crear la tabla Categories: ${error}`);
            return;
          }

          // Exito:
          console.log("Tabla creada con exito!");
        });

        connection.query(createTableEvents, (error, result) => {
          if (error) {
            console.error(`Error al crear la tabla Events: ${error}`);
            return;
          }

          // Exito:
          console.log("Tabla creada con exito!");
        });

        connection.query(insertValuesCategories, (error, result) => {
          if (error) {
            console.error(`Error al cargar los datos: ${error}`);
            return;
          }
          console.log("Datos cargados en Categoria exitosamente.");
        });
      }
    );
  });
});

module.exports = connection;
