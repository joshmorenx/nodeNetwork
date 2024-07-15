const updatePost = async (req, res) => {
    const { username } = req.usuario;
    const { id, content, latitude, longitude } = req.body;

    console.log(username, id, content, latitude, longitude);
    try {

    } catch (error) {
        res.status(500).json({ error: error });
    }
};

module.exports = updatePost;
