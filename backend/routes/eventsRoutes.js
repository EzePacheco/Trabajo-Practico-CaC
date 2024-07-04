const express = require("express");
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  getEventsByUser,
  getByCategory,
  addFavorites,
  getFavorites,
  deleteFavorite,
} = require("../controllers/eventsController.js");

const router = express.Router();

// CRUD de Eventos
router.post("/create-event", createEvent);
router.put("/update-event/:event_id", updateEvent);
router.delete("/delete-event/:event_id", deleteEvent);
router.get("/all", getEvents);
router.get("/category/:category_id", getByCategory);
router.get("/:user_id", getEventsByUser);

// CRUD de Favoritos
router.post("/favorites", addFavorites);
router.get("/favorites/:user_id", getFavorites);
router.delete("/favorites/:favorite_id", deleteFavorite);

module.exports = router;
