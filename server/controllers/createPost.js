const {request, response} = require("express")
const Posts = require("../models/Posts.js");

const createPost = async (req = request, res = response) => {
    const { content, latitude, longitude } = req.body
    if (await content) {
        res.status(200).json({message: `post creado correctamente (aun no implementado pero esta respuesta es desde el backend), esto fue lo que escribiste: ${content}`});
    }
}
module.exports = createPost