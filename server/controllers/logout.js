const { request, response } = require("express")
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const logout = async (req = request, res = response) => {
    try {
    let { token } = req.body
    let tokenData = new Object();
        if(token){
            jwt.verify(token, process.env.SECRET, (error, decodedToken) => {
                if(error){
                    return res.status(401).json({ msg: 'Token no valido' })
                }
                tokenData = decodedToken
            })
            let result = await User.updateOne({ username: tokenData.username }, { $set: { isLogged: false } })
            // console.log(tokenData);
            if (result) {
                return res.status(200).json({ msg: 'Sesion cerrada', logStatusRefresh: true })
            }
        }
    } catch (error) {
        console.error("Error al cerrar la sesión:", error);
    }
    // req.session.destroy((err) => {
    //     if (err) {
    //         console.error("Error al cerrar la sesión:", err);
    //     }
    //     res.redirect("/");
    // });
}

module.exports = logout;