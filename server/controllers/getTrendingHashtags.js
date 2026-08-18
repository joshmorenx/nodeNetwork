const Posts = require("../models/Posts.js");

const HASHTAG_REGEX = /#[\wáéíóúñ]+/gi;

// Devuelve los hashtags más usados en publicaciones recientes (últimos 7 días).
// Si no hay publicaciones recientes, cae a todas las publicaciones.
const getTrendingHashtags = async (req, res) => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        let recentPosts = await Posts.find({ date_created: { $gte: sevenDaysAgo } }, { content: 1 }).lean();

        if (recentPosts.length === 0) {
            recentPosts = await Posts.find({}, { content: 1 }).lean();
        }

        const counts = {};

        recentPosts.forEach((post) => {
            if (!post.content) {
                return;
            }

            const hashtags = post.content.match(HASHTAG_REGEX) || [];
            hashtags.forEach((hashtag) => {
                const normalized = hashtag.toLowerCase();
                counts[normalized] = (counts[normalized] || 0) + 1;
            });
        });

        const hashtags = Object.entries(counts)
            .map(([tag, count]) => ({ tag: tag, count: count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);

        res.json({ hashtags: hashtags, success: true });
    } catch (error) {
        res.status(500).json({ hashtags: [], success: false, message: "Error al obtener los hashtags." });
    }
};

module.exports = getTrendingHashtags;
