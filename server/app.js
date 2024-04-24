const express = require("express");
const app = express();
const User = require("./models/User.js");
const Permission = require("./models/Permission.js");
const authRoutes = require("./routes/auth.js");
const jwt = require("jsonwebtoken");
const cors = require("cors");

app.use(cors())

// const Hola = require('./views/hola.jsx').default;
require('dotenv').config();

// Configuración de Express.js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// app.set('view engine', 'jsx');

// Rutas de autenticación
app.use("/", authRoutes);

// Ruta del panel de control
app.get("/dashboard", (req, res) => {
  if (!req.session.token) {
    return res.redirect("/");
  }
  try {
    const decoded = jwt.verify(req.session.token, process.env.SECRET);
    res.render("dashboard",
      {
        userId: req.session.username,
        adminContent: req.session.adminContent,
        commonContent: req.session.commonContent,
        noContent: req.session.noContent
      });
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    res.redirect("/");
  }
});

// REST API

app.get("/dashboard/api/", async (req, res) => {
  if (!req.session.token) {
    return res.json({ informacion: "no has iniciado sesión" });
  }
  try {
    const users = await User.find({}, { password: 0 }); // Excluimos el campo "password"
    res.json(users);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

// app.get("/dashboard/api/:username", async (req, res) => {
//   if (!req.session.token) {
//     return res.json({ informacion: "no has iniciado sesión" });
//   }
//   const { username } = req.params;
//   try {
//     const user = await User.findOne({ username }, { password: 0 }); // Excluimos el campo "password"

//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ error: "Usuario no encontrado" });
//     }
//   } catch (error) {
//     console.error("Error al obtener el usuario:", error);
//     res.status(500).json({ error: "Error al obtener el usuario" });
//   }
// });

// app.get("/dashboard/api/matricula/:registryNumber", async (req, res) => {
//   if (!req.session.token) {
//     return res.json({ informacion: "no has iniciado sesión" });
//   }
//   const { registryNumber } = req.params;
//   try {
//     const user = await User.findOne({ "organization.registryNumber": registryNumber }, { password: 0 }); // Excluimos el campo "password"

//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ error: "Usuario no encontrado" });
//     }
//   } catch (error) {
//     console.error("Error al obtener el usuario:", error);
//     res.status(500).json({ error: "Error al obtener el usuario" });
//   }
// });

// //AGREGACIÓN DE PERMISOS
app.post("/users/:id/:permissionId", async (req, res) => {
  const { id, permissionId } = req.params;
  const user = await User.findOne({ id });
  const permission = await Permission.findOne({ permissionId });

  try {
    if (user && permission) {
      // Verificar si el permiso ya existe en el usuario
      const existingPermission = user.permissions.find((perm) => perm.equals(permission._id));

      if (existingPermission) {
        return res.status(400).json({ error: "El permiso ya está asignado al usuario" });
      }

      // Agregar el ID del permiso al campo 'permissions' del usuario
      user.permissions.push(permission);

      // Guardar los cambios en el usuario
      await user.save();

      return res.json({ message: "Permiso agregado al usuario correctamente" });
    } else {
      return res.status(404).json({ error: "Usuario o permiso no encontrado" });
    }
  } catch (error) {
    console.error("Error al agregar el permiso al usuario:", error);
    return res.status(500).json({ error: "Error al agregar el permiso al usuario" });
  }
});

// app.post("/api/permissions/:id/:description", async (req, res) => {
//   try {
//     let {id, description} = req.params
//     const ultimoPermiso = await Permission.findOne({}, { sort: { id: -1 } });
    
//     if (ultimoPermiso) {
//       id = parseInt(ultimoPermiso.id) + 1; // Convertir a número
//     }

//     const permission = new Permission({
//       permissionId:id,
//       permissionName: description
//     })
//     await permission.save();
//     return res.status(200).json({message:"Permiso agregado correctamente"});
//   } catch (error) {
//     return res.json({ error: error.message });    
//   }
// });

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}/`);
});
