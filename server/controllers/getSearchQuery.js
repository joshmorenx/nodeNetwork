
const getSearchQuery = async (req, res) => {
    const { query } = req.headers

    try {
        if(query){
            res.status(200).json({message: `server response ${query}`, success: true, results: []})
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = getSearchQuery