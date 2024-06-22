const User = require("../models/User.js");
const Relationships = require("../models/Relationships.js");

const deleteRelationship = async (req, res) => {
    
    const { username } = req.usuario;
    const { username_to_unfollow } = req.headers;

    console.log(username, username_to_unfollow);

}

module.exports = deleteRelationship