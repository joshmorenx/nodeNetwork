const express = require("express");
const session = require("express-session");
const app = express();
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const permissionRoutes = require("./routes/permissionRoutes.js");
const staticRoutes = require("./routes/staticRoutes.js");
const cors = require("cors"); 

// Middleware
const allowedOrigins = ['http://localhost:3000', 'http://localhost:8080', 'http://127.0.0.1:8080', 'http://localhost:5173']

// Configuración
require('dotenv').config();

// Configuración de Express.js
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: true,
  })
);

// authentication and authorization routes
app.use("/", authRoutes);

// user routes
app.use("/", userRoutes);

// permission routes
app.use("/", permissionRoutes);

// static files
app.use("/", staticRoutes);

// server start
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}/`);
});
