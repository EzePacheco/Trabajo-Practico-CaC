const express = require("express");
const usersRoutes = require("../routes/usersRoutes.js");
const eventsRoutes = require("../routes/eventsRoutes.js");

const app = express();

const PORT = process.env.PORT || 5000;

app.use("/auth", usersRoutes);
app.use("/events", eventsRoutes);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto: ${process.env.MY_PORT}`);
});
