const { request, response } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const Permission = require("../models/Permission.js");
const { ConnectionStates } = require("mongoose");

const updateProfile = async (req = request, res = response) => {
    
    const addedPermissions = []
    const { username } = req.usuario
    const { option, firstName, lastName, email, image } = req.body // updating personal data
    const user = await User.findOne({ username: username })
    let token = null

    try {
        for(elem of user.permissions){
            let assignedPermissions = await Permission.findOne({ _id : elem });
            addedPermissions.push(assignedPermissions)
        }

        switch (option) {
            case "name":
                user.firstName = (firstName ? firstName : user.firstName)
                user.lastName = (lastName ? lastName : user.lastName)
                const resultName = await user.save() // have to find the way to save the changes without renaming id field
                if(resultName) {
                    //regen token
                    token = jwt.sign({ userId: user._id, username: user.username, firstName: user.firstName, lastName: user.lastName, email: user.email, isLogged: user.isLogged ,permissions: addedPermissions, profilePicture: user.profilePicture }, process.env.SECRET);
                    res.status(200).json({ message: "Nombres actualizados correctamente", success: true, token: token })
                }
                break;
    
            case "email":
                user.email = (email ? email : user.email)
                const resultEmail = await user.save()
                if(resultEmail) {
                    token = jwt.sign({ userId: user._id, username: user.username, firstName: user.firstName, lastName: user.lastName, email: user.email, isLogged: user.isLogged ,permissions: addedPermissions, profilePicture: user.profilePicture }, process.env.SECRET);
                    res.status(200).json({ message: "Email actualizado correctamente", success: true, token: token })
                }
                break;

            case "picture":

                break;
    
            // case "picture":
            //     break;
        
            default:
                break;
        }
        
        if(token) req.session.token = token;

        // jwt.verify(token.replace('Bearer ', ''), process.env.SECRET, (error, decodedToken) => {
        //     if (error) {
        //         //
        //     }
        //     console.log(decodedToken);
        // }); //just to verify that the token is valid debug purposes

    } catch (error) {
        console.log(error)
    }
    
}

module.exports = updateProfile