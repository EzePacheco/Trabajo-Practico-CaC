const getEvents = (req, res) => {
  console.log("Obteniendo Eventos");
  res.json({ msg: "Listado de Eventos" });
};

const getFavorites = (req, res) => {
  console.log("Obteniendo Favoritos");
};

const getCategory = (req, res) => {
  console.log("Obteniendo Categoria");
};

const createEvent = (req, res) => {
  console.log("Creando Evento....");
};

const updateEvent = (req, res) => {
  console.log("Actualizando evento...");
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
