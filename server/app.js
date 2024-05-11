const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.js");
const cors = require("cors");
const statics = require("serve-static");

app.use(cors())

// const Hola = require('./views/hola.jsx').default;
require('dotenv').config();

// Configuración de Express.js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Rutas de autenticación
app.use("/", authRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}/`);
});
