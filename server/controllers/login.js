const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const Permission = require("../models/Permission.js");
const { ConnectionStates } = require("mongoose");

const login = async (req = request, res = response) => {
    try {
        const { username, password, isLogged } = req.body;
        const user = await User.findOne({ username });
        const addedPermissions = []
        
        if (!user) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }
        //se puede buscar por el objectId del usuario ya que esta referenciada la coleccion usuarios y permisos aqui por ejemplo un for que mande los objectIds del array de permisos del usuario y busque uno a uno el objectId que coincida con el de la coleccion de permisos.
        for(elem of user.permissions){
            let assignedPermissions = await Permission.findOne({ _id : elem });
            addedPermissions.push(assignedPermissions)
            // console.log(addedPermissions)
        }
        
        try {
            // Encuentra el usuario por su ID y actualiza el campo isLogged
            const resultado = await User.updateOne({ username: user.username }, { $set: { isLogged: isLogged } });
            // console.log("Actualización exitosa:", resultado);   
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
        }
        

        const token = jwt.sign({ userId: user._id, username: user.username, email: user.email, isLogged: user.isLogged ,permissions: addedPermissions }, process.env.SECRET);
        req.session.token = token;

        return res.status(200).json({ msg: "Usuario encontrado, redirigiendo...", token, user: user.username });
    } catch (error) {
        return res.status(500).json({ error: "Ha ocurrido un error en el servidor" });
    }
}

module.exports = login; 