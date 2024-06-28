const db = require("../database/db.js");

const getEvents = (req, res) => {
  // Creamos la consulta
  const sqlQuery = "SELECT * FROM events";

  // Enviamos la consulta
  db.query(sqlQuery, (error, result) => {
    if (error) {
      console.error(`Error en la conexion en la base de datos: ${error}`);
      return res.status(500).json({ msg: "Error en el servidor" });
    }
    return res.status(200).json(result);
  });
};

const getFavorites = (req, res) => {
  console.log("Obteniendo Favoritos");
};

const getCategory = (req, res) => {
  console.log("Obteniendo Categoria");
};

const createEvent = (req, res) => {
  // Desestructuramos la informacion del formulario.
  const { title, date, hour, place_name, street, city, description, image } =
    req.body;

  // Creamos la consulta:
  const sqlQuery =
    "INSERT INTO events (title, date, hour, place_name, street, city, description, image) VALUES (?,?,?,?,?,?,?,?)";

  // Enviamos la consulta:
  db.query(
    sqlQuery,
    [title, date, hour, place_name, street, city, description, image],
    (error, result) => {
      if (error) {
        console.error(`Error en la conexion en la base de datos: ${error}`);
        return res.status(500).json({ msg: "Error en el servidor" });
      }

      return res.status(200).json(result);
    }
  );
};

const updateEvent = (req, res) => {
  //Desestructuracion de la info
  const { id } = req.params;
  const { title, date, hour, place_name, street, city, description, image } =
    req.body;

  // Creamos la consulta
  const sqlQuery =
    "UPDATE events SET title = ?, date = ?, hour = ?, place_name = ?, street = ?, city = ?, description = ?, image = ? WHERE event_id = ?";

  // Enviamos la consulta:
  db.query(
    sqlQuery,
    [title, date, hour, place_name, street, city, description, image, id],
    (error, result) => {
      if (error) {
        console.error(`Error en la conexion en la base de datos: ${error}`);
        return res.status(500).json({ msg: "Error en el servidor" });
      }
      // Verificación si se actualizó algún registro
      if (result.affectedRows === 0) {
        return res.status(404).json({ msg: "Evento no encontrado" });
      }
      return res
        .status(200)
        .json({ msg: "Evento actualizado con exito", eventUpdated: req.body });
    }
  );
};

const deleteEvent = (req, res) => {
  console.log("Borrando Evento...");
};

module.exports = {
  getEvents,
  getFavorites,
  getCategory,
  createEvent,
  updateEvent,
  deleteEvent,
};
