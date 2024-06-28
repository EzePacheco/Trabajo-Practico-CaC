const express = require("express");
const usersRoutes = require("../routes/usersRoutes.js");
const eventsRoutes = require("../routes/eventsRoutes.js");

const app = express();

// Habilitar lectura de datos de formularios
app.use(express.urlencoded({ extended: true }));

// Habilitar lectura de JSON desde las peticiones
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use("/auth", usersRoutes);
app.use("/events", eventsRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto: ${PORT}`);
});
