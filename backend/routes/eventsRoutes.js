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

router.get("/favorites", getFavorites);

// Ver como implementar busqueda por categoria con variable en endpoint.
router.get("/category/:category", getCategory);

router.post("/create-event", createEvent);

router.put("/update-event", updateEvent);

router.delete("/delete-event", deleteEvent);

module.exports = router;
