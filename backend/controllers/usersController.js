const db = require("../database/db");
const jwt = require("jsonwebtoken");
const secretKey = "mundo-eventos-2024";

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, result) => {
      if (err) {
        console.error(`Error en la conexion en la base de datos: ${err}`);
        return res.status(500).json({ msg: "Error en el servidor" });
      }

      if (result.length === 0) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
      }

      const user = result[0];

      if (password !== user.password) {
        return res.status(401).json({ msg: "Contraseña incorrecta" });
      }

      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "5h",
      });
      return res.status(200).json({ msg: "Usuario logueado con éxito", token });
    });
  } else {
    return res.status(400).json({ msg: "Debes completar los campos" });
  }
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
