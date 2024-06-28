const db = require("../database/db");

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (email != "" && password != "") {
    const sql = "SELECT * FROM users WHERE email = ?, password = ?";
    db.query(sql, [email, password], (err, result) => {
      if (err) {
        console.error(`El Usuario no existe`);
        return;
      }
      return res.status(200).json({ msg: "Datos cargados con éxito" });
    });
  }

  throw new Error("Debes completar los campos boludito");
};

const registerUser = (req, res) => {
  // Obtengo datos del formulario
  const { name, email, password } = req.body;

  // Prevenir registro duplicado.
  const sqlQuery = "SELECT COUNT(*) AS emailCount FROM users WHERE email = ?";

  // Enviar consulta a la base de datos.
  db.query(sqlQuery, [email], (error, result) => {
    // Error de consulta
    if (error) {
      console.log(`Error de comunicación con la base de datos: ${error}`);
      return res.status(500).json({
        msg: `Error de comunicación con la base de datos: ${error}`,
      });
    }
    console.log(result);

    const emailExist = result[0].emailCount > 0;

    if (emailExist) {
      console.log(`Datos existentes: El email ya ha sido registrado.`);
      return res.status(404).json({ msg: "El email ya ha sido registrado." });
    }

    // Si el usuario no existe crear nuevo registro.
    const sqlQuery =
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    // Enviar consulta a la base de datos.
    db.query(sqlQuery, [name, email, password], (error, result) => {
      if (error) {
        console.error(`Error al registrar usuario: ${error}`);
        return res.status(500).json({
          msg: `Error de comunicación con la base de datos: ${error}`,
        });
      }

      console.log("Datos cargados con éxito: Usuario Registrado");
      return res.status(200).json({ msg: "Usuario registrado exitosamente." });
    });
  });
};

module.exports = {
  loginUser,
  registerUser,
};
