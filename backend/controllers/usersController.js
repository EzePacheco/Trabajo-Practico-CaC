const bcrypt = require("bcrypt");
const db = require("../database/db.js");
const jwt = require("jsonwebtoken");
const secretKey = "mundo-eventos-2024";

const loginUser = (req, res) => {
  //Desestructuramos el req.body con la info que necesitamos.
  const { email, password } = req.body;

  // Si el usuario carga los campos
  if (email && password) {
    // Creamos la consulta SQL para verificar el Email en la tabla Users
    const sqlQuery = "SELECT * FROM users WHERE email = ?";

    //Enviamos la consulta
    db.query(sqlQuery, [email], async (error, result) => {
      // Manejo de error de conexion al servidor de la database
      if (error) {
        console.error(`Error en la conexion en la base de datos: ${error}`);
        return res.status(500).json({ msg: "Error en el servidor" });
      }

      // Verificamos que el mail sea el correcto
      if (result.length === 0) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
      }

      // Almacenamos los datos del usuario encontrado
      const user = result[0];

      const passwordCompared = await bcrypt.compare(password, user.password);

      // Comparamos la password enviada en req.body con la almacenada en el registro
      if (!passwordCompared) {
        return res.status(401).json({ msg: "Contraseña incorrecta" });
      }

      // Generamos un token con JWT con expiracion a 5hs
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
  db.query(sqlQuery, [email], async (error, result) => {
    // Error de consulta
    if (error) {
      console.log(`Error de comunicación con la base de datos: ${error}`);
      return res.status(500).json({
        msg: `Error de comunicación con la base de datos: ${error}`,
      });
    }
    console.log(result);

    // Validamos si el email existe:
    const emailExist = result[0].emailCount > 0;

    if (emailExist) {
      console.log(`Datos existentes: El email ya ha sido registrado.`);
      return res.status(404).json({ msg: "El email ya ha sido registrado." });
    }

    try {
      // Si el usuario no existe crear nuevo registro.
      const sqlQuery =
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

      // Hashear password.
      const salt = await bcrypt.genSalt(1);
      let passwordHashed = await bcrypt.hash(password, salt);

      console.log("Hashed Password:", passwordHashed);
      console.log("Hashed Password Length:", passwordHashed.length);

      // Enviar consulta a la base de datos.
      db.query(sqlQuery, [name, email, passwordHashed], (error, result) => {
        if (error) {
          console.error(`Error al registrar usuario: ${error}`);
          return res.status(500).json({
            msg: `Error de comunicación con la base de datos: ${error}`,
          });
        }

        console.log("Datos cargados con éxito: Usuario Registrado");
        return res
          .status(200)
          .json({ msg: "Usuario registrado exitosamente." });
      });
    } catch (error) {
      console.error(`Error: ${error}`);
      return res.status(500).json({
        msg: `Error en el servidor: ${error}`,
      });
    }
  });
};

module.exports = {
  loginUser,
  registerUser,
};
