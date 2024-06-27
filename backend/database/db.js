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
  const sqlUseDB = "USE mundo_eventos_db";
  connection.query(sqlUseDB, (err, res) => {
    if (error) {
      console.error(`Error al conectar con base de datos`);
      return;
    }
    console.log("enlace a base de datos correcta");
  });
  console.log("Conexion Establecida con servidor SQL");
});

module.exports = {
  connection,
};
