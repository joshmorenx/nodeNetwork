const { request, response } = require("express")
const User = require("../models/User.js");
const Permission = require("../models/Permission.js");

const lastPermission = async (req = request, res = response) => {
    const { typeUpdate, permId, permName, newPermName, newPermDesc } = req.body
    // const lastPermissionRegistry = await Permission.findOne({},{permissionId:1},{sort:{ permissionId: -1 }});
    
    try {
        if(typeUpdate === 'add') {
            const lastPermissionRegistry = await Permission.findOne({},{permissionId:1},{sort:{ permissionId: -1 }});
            if(newPermName && newPermDesc){
                const newPermission = new Permission({
                    permissionId: lastPermissionRegistry ? lastPermissionRegistry.permissionId + 1 : 1,
                    permissionName: newPermName,
                    permissionDescription: newPermDesc
                })
            
                const result = await newPermission.save();

                if(result) {
                    res.json({message:"Permiso creado correctamente"});
                }
            } else {
                res.json({message:"Faltan datos por llenar"});
            }
        }

        else if(typeUpdate === 'remove') {
            
            const usersThatUseThisPermission = []
            // check if that permission is being used by another user if not delete it
            const perm_Id = await Permission.findOne({ permissionId: permId });
            const filteredUser = await User.find({ permissions: perm_Id._id });

            filteredUser.map((user) => {
                usersThatUseThisPermission.push(user.username)
            })

            if(usersThatUseThisPermission.length > 0) {
                res.json({message:"No se puede borrar el permiso ya que esta siendo usado por otro usuario.", usersThatUseThisPermission: usersThatUseThisPermission});
            } else {
                const result = await Permission.deleteOne({ permissionId: permId });
                if(result) {
                    res.json({message:"Permiso borrado correctamente"});
                }
            }
        }
    } catch (error) {
        return res.json({ message: error });
    }
    
}    

module.exports = lastPermission 
