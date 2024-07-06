const db = require("../database/db.js");

const createEvent = (req, res) => {
  // Desestructuramos la informacion del formulario.
  const {
    user_id,
    title,
    date,
    hour,
    place_name,
    street,
    city,
    description,
    image,
    category_id,
  } = req.body;

  // Creamos la consulta:
  const sqlQuery =
    "INSERT INTO events (title, date, hour, place_name, street, city, description, image, user_id, category_id) VALUES (?,?,?,?,?,?,?,?,?,?)";

  // Enviamos la consulta:
  db.query(
    sqlQuery,
    [
      title,
      date,
      hour,
      place_name,
      street,
      city,
      description,
      image,
      user_id,
      category_id,
    ],
    (error, result) => {
      if (error) {
        console.error(`Error en la conexion con la base de datos: ${error}`);
        return res.status(500).json({ msg: "Error en el servidor" });
      }

      return res.status(200).json({ msg: "Evento creado con exito!" });
    }
  );
};

const updateEvent = (req, res) => {
  //Desestructuracion de la información en la petición.
  const { event_id } = req.params;
  const { title, date, hour, place_name, street, city, description, image } =
    req.body;

  // Creamos la consulta.
  const sqlQuery =
    "UPDATE events SET title = ?, date = ?, hour = ?, place_name = ?, street = ?, city = ?, description = ?, image = ? WHERE event_id = ?";

  // Enviamos la consulta.
  db.query(
    sqlQuery,
    [title, date, hour, place_name, street, city, description, image, event_id],
    (error, result) => {
      if (error) {
        console.error(`Error en la conexion con la base de datos: ${error}`);
        return res.status(500).json({ msg: "Error en el servidor" });
      }
      // Verificación si se actualizó algún registro.
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
  //Desestructuracion de la información en la petición.
  const { event_id } = req.params;

  // Creamos la consulta.
  const sqlQuery = "DELETE FROM events WHERE event_id = ?";

  // Enviamos la consulta.
  db.query(sqlQuery, [event_id], (error, result) => {
    if (error) {
      console.error(`Error en la conexión a la base de datos: ${error}`);
      return res.status(500).json({ msg: "Error en el servidor" });
    }
    return res.status(200).json({ msg: "Evento borrado con exito" });
  });
};

const getEvents = (req, res) => {
  // Creamos la consulta
  const sqlQuery = "SELECT * FROM events";

  // Enviamos la consulta
  db.query(sqlQuery, (error, result) => {
    if (error) {
      console.error(`Error en la conexion con la base de datos: ${error}`);
      return res.status(500).json({ msg: "Error en el servidor" });
    }
    return res.status(200).json(result);
  });
};

const getEventsByUser = (req, res) => {
  //Desestructuracion de la información en la petición.
  const { user_id } = req.params;

  //Creamos la consulta.
  const sqlQuery = "SELECT * FROM events WHERE user_id = ?";

  // Enviamos la consulta.
  db.query(sqlQuery, [user_id], (error, result) => {
    if (error) {
      console.error(`Error en la conexion con la base de datos: ${error}`);
      return res.status(500).json({ msg: "Error en el servidor" });
    }
    res.status(200).json(result);
  });
};

const addFavorites = (req, res) => {
  //Desestructuracion de la información en la petición.
  const { user_id, event_id } = req.body;

  // Creamos la consulta.
  const sqlQuery = "INSERT INTO favorites (user_id, event_id) VALUES (?,?)";

  // Enviamos la consulta.
  db.query(sqlQuery, [user_id, event_id], (error, result) => {
    if (error) {
      console.error(`Error en la conexion en la base de datos: ${error}`);
      return res.status(500).json({ msg: "Error en el servidor" });
    }

    res.status(200).json({ msg: "Evento añadido a favoritos" });
  });
};

const getFavorites = (req, res) => {
  //Desestructuracion de la información en la petición.
  const { user_id } = req.params;

  // Verificamos que se haya ingresado un id.
  if (!user_id) {
    return res.status(400).json({ msg: "User ID es requerido" });
  }

  // Creamos la consulta.
  //e. => refiere a tabla eventos // f. => refiere a tabla favoritos // c. => refiere a tabla categorias
  const sqlQuery = `
    SELECT 
      e.event_id,
      e.title,
      e.date,
      e.hour,
      e.place_name,
      e.street,
      e.city,
      e.description,
      e.image,
      c.name AS category_name,
      f.favorite_id
    FROM 
      favorites f
    JOIN 
      events e ON f.event_id = e.event_id
    JOIN 
      categories c ON e.category_id = c.category_id
    WHERE 
      f.user_id = ?;
  `;

  // Enviamos la consulta.
  db.query(sqlQuery, [user_id], (error, result) => {
    if (error) {
      console.error(`Error en la conexión a la base de datos: ${error}`);
      return res.status(500).json({ msg: "Error en el servidor" });
    }
    return res.status(200).json(result);
  });
};

const deleteFavorite = (req, res) => {
  //Desestructuracion de la información en la petición.
  const { user_id } = req.body;
  const { favorite_id } = req.params;

  if (!favorite_id) {
    const error = new Error("Id de evento falta o es inválido.");
    return res.status(403).json({ msg: error.message });
  }

  // Creamos la consulta
  const sqlQuery =
    "DELETE FROM favorites WHERE user_id = ? AND favorite_id = ?";

  // Enviamos la consulta
  db.query(sqlQuery, [user_id, favorite_id], (error, result) => {
    if (error) {
      console.error(`Error en la conexión a la base de datos: ${error}`);
      return res.status(500).json({ msg: "Error en el servidor" });
    }

    return res
      .status(200)
      .json({ msg: "El evento se ha quitado de favoritos correctamente." });
  });
};

const getByCategory = (req, res) => {
  //Desestructuracion de la información en la petición.
  const { category_id } = req.params;

  // Creamos la consulta.
  const sqlQuery =
    "SELECT * FROM events JOIN categories ON events.category_id = categories.category_id WHERE events.category_id = ? ";

  // Enviamos la consulta.
  db.query(sqlQuery, [category_id], (error, result) => {
    if (error) {
      console.error(`Error en la conexión a la base de datos: ${error}`);
      return res.status(500).json({ msg: "Error en el servidor" });
    }
    return res.status(200).json(result);
  });
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  getEventsByUser,
  getByCategory,
  addFavorites,
  getFavorites,
  deleteFavorite,
};
