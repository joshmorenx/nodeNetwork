const { request, response } = require("express")
const Permission = require("../models/Permission.js");

const updatePermissions = async (req=request, res=response) => {
    const { id, newDescription } = req.body
    try {
        if(id && newDescription) {
            // const resultUpdate = await Permission.updateOne({ permissionId: id }, { $set: { permissionName: newDescription } })
            // if(resultUpdate) {
            //     return res.status(200).json({message:"Permiso modificado correctamente"});
            // }
            const permission = await Permission.findOne({ permissionId: id })
            permission.permissionDescription = newDescription
            const result = await permission.save()
            if(result) {
                res.json({message:"Permiso modificado correctamente"});
            }
        } else {
            res.json({ message: "Faltan datos" });
        }
    } catch (error) {
        res.json({ error: error });
    }   
}

module.exports = updatePermissions;