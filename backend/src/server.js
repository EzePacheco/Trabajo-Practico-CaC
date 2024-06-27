const express = require("express");
const usersRoutes = require("../routes/usersRoutes.js");
const eventsRoutes = require("../routes/eventsRoutes.js");
const { connection } = require("../database/db.js");

const app = express();

// Habilitar datos de formularios
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const PORT = process.env.ALT_PORT || 3000;

app.use("/auth", usersRoutes);
app.use("/events", eventsRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto: ${PORT}`);
});
