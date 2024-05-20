const { request, response } = require("express");
const User = require("../models/User.js");

const updateProfile = async (req = request, res = response) => {

    const { username } = req.usuario
    const { firstName, lastName, email } = req.body // updating personal data
    const user = await User.findOne({ username: username })
    
}

module.exports = updateProfile