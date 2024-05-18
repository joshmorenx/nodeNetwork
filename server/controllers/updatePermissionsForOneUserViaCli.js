const { request, response } = require("express")
const User = require("../models/User.js");
const Permission = require("../models/Permission.js");

const updatePermissionsForOneUserViaCli = async (req = request, res = response) => {
    const { username, permissionid } = req.params
    try {
        const user = await User.findOne({ username: username })
        const permission = await Permission.findOne({ permissionId: permissionid })
        const permission_id = await Permission.findOne({ permissionId: permissionid }).select('_id');

        if (user.permissions.includes(permission._id)) {
            res.json({message: `No se puede asignar un permiso ya asignado al usuario ${user.username}`})
        } else if(!user || !permission){
            res.json({error: "Faltan datos"})
        } else if (!user) {
            res.json({ error: "Usuario no encontrado", message: "Usuario no encontrado" })
        }  else {
            user.permissions.push(permission_id)
            const result = await user.save()
            if(result) {
                res.status(200).json({ message: "Permisos actualizados correctamente para este usuario", success: true })
            }
        }
        
    } catch (error) {
        res.json({ error: 'ocurrio un error' })
    }
}

module.exports = updatePermissionsForOneUserViaCli