const db = require("../database/db");

const loginUser = (req, result) => {
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

const registerUser = (req, result) => {
  // Obtengo datos del formulario
  const { name, email, password } = req.body;

  // Creo la consulta sql para crear el registro.
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  // Enviar consulta a base de datos.
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error(`Error al registrar usuario: ${err.message}`);
      res.status(500).json({ error: "Error interno del servidor" });
      return;
    }

    console.log("Datos cargados con éxito");
  });
};

module.exports = {
  loginUser,
  registerUser,
};
