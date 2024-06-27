const mysql = require("mysql2");

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
  // Creamos la consulta para crear la db en caso de que no exista, sino, va a posicionarse en ella
  const sqlCreateDB = "CREATE DATABASE IF NOT EXISTS mundo_eventos";

  // Pasamos la consulta a la db
  connection.query(sqlCreateDB, (err, result) => {
    if (err) {
      console.error(`Error de conexion con el servidor: ${err}`);
      return;
    }

    // Consulta OK:
    console.log(
      "Base de datos 'mundo_eventos' creada o cambiada correctamente"
    );

    // Creacion de tablas:
    connection.changeUser(
      {
        database: "mundo_eventos",
      },
      (err) => {
        if (err) {
          console.error(`Error al cambiar a la database ${database}: ${err}`);
          return;
        }

        console.log("Conectado a la base de datos 'mundo_eventos'");

        // Generamos la consulta
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
        street VARCHAR(100),
        city VARCHAR(100),
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

        const insertValuesCategories = `INSERT INTO categories(name) VALUES ('Arte y Entretenimiento'), ('Deporte'), ('Musica'), ('Educativos'), ('Gastronomia'), ('Gaming'), ('Corporativos')`;

        // Pasamos la consulta
        connection.query(insertValuesCategories, (err, result) => {
          if (err) {
            console.error(`Error al cargar los datos: ${err}`);
            return;
          }
          console.log("Datos cargados exitosamente");
        });

        connection.query(createTableUsers, (err, result) => {
          if (err) {
            console.error(`Error al crear la tabla Users: ${err}`);
            return;
          }

          // Exito:
          console.log("Tabla creada con exito!");
        });
        connection.query(createTableEvents, (err, result) => {
          if (err) {
            console.error(`Error al crear la tabla Events: ${err}`);
            return;
          }

          // Exito:
          console.log("Tabla creada con exito!");
        });

        connection.query(createTableCategories, (err, result) => {
          if (err) {
            console.error(`Error al crear la tabla Categories: ${err}`);
            return;
          }

          // Exito:
          console.log("Tabla creada con exito!");
        });
      }
    );
  });
});

module.exports = connection;
