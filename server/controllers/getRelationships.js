const User = require("../models/User");
const Relationships = require("../models/Relationships");

const getRelationships = async (req, res) => {
    // const { username } = req.usuario
    const { param_username } = req.headers
    const username = param_username

    try {
        const user = await User.findOne({ username: username }).lean()

        const following = await Relationships.find({ from: user._id }, { to: 1 }).lean()
        const followers = await Relationships.find({ to: user._id }, { from: 1 }).lean()

        const followingData = await User.find({ _id: { $in: following.map(following => following.to) } }).lean()
        const followersData = await User.find({ _id: { $in: followers.map(followers => followers.from) } }).lean()

        return res.status(200).json({ following: followingData, followers: followersData, success: true, message: "Relaciones encontradas" })
    } catch (error) {
        console.log(error)
    }
}

module.exports = getRelationships