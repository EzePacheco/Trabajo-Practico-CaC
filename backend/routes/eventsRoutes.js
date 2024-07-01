const express = require("express");
const {
  getEvents,
  getFavorites,
  getCategory,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventsController.js");

const router = express.Router();

router.get("/all", getEvents);

router.get("/favorites/:user_id", getFavorites);

// Ver como implementar busqueda por categoria con variable en endpoint.
router.get("/category/:category_id", getCategory);

router.post("/create-event", createEvent);

router.put("/update-event/:event_id", updateEvent);

router.delete("/delete-event/:event_id", deleteEvent);

module.exports = router;
