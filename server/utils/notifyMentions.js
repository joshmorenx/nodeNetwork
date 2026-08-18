const User = require("../models/User.js");
const Notifications = require("../models/Notifications.js");

const MENTION_REGEX = /@([A-Za-z0-9_.]+)/g;

// Crea una notificación por cada usuario mencionado (@usuario) en el contenido.
// No notifica al propio autor.
const notifyMentions = async ({ fromUsername, content, post, postIdNumber, descriptionSuffix }) => {
    if (!content) {
        return;
    }

    const mentionedUsernames = [...new Set(
        (content.match(MENTION_REGEX) || []).map((mention) => mention.slice(1).toLowerCase())
    )];

    if (mentionedUsernames.length === 0) {
        return;
    }

    const fromUser = await User.findOne({ username: fromUsername.toLowerCase() });
    if (!fromUser) {
        return;
    }

    const mentionedUsers = await User.find({ username: { $in: mentionedUsernames } }).lean();

    for (const mentioned of mentionedUsers) {
        if (mentioned._id.equals(fromUser._id)) {
            continue;
        }

        const latestNotification = await Notifications.findOne({}, {}, { sort: { notificationId: -1 } }).lean();

        await Notifications.create({
            from: fromUser._id,
            reason: "mention",
            to: mentioned._id,
            postId: post,
            postIdNumber: postIdNumber,
            description: `${fromUser.username} ${descriptionSuffix}`,
            notificationId: latestNotification === null ? 1 : latestNotification.notificationId + 1,
        });
    }
};

module.exports = notifyMentions;
