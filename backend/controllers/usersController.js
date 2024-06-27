const db = require("../database/db.js");

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (email != "" && password != "") {
    const sql = "SELECT * FROM users WHERE email = ?, password = ?";
    db.query(sql, [email, password], (err, res) => {
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

  // Creo la consulta sql para crear el registro.
  const sql =
    "INSERT INTO mundo_eventos_db.users (name, email, password) VALUES (?, ?, ?)";

  // Enviar consulta a base de datos.
  db.query(sql, [name, email, password], (err, res) => {
    if (err) {
      console.error(`Error al enviar datos: ${err}`);
      return;
    }
    res.status(200).json({ msg: "Datos cargados con éxito" });
  });
};

module.exports = {
  loginUser,
  registerUser,
};
