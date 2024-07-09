const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User.js');
const Posts = require('./Posts.js');

const NotificationSchema = new Schema({
    notificationId: { type: Number, unique: true },
    from: { type: Schema.Types.ObjectId, ref: User },
    to: { type: Schema.Types.ObjectId, ref: User },
    postId: { type: Schema.Types.ObjectId, ref: Posts },
    enum: ['comment', 'like', 'dislike'],
    opened: { type: Boolean, default: false },
    date_created: { type: Date, default: Date.now() },
    date_updated: { type: Date, default: Date.now() },
})

const Notifications = mongoose.model('Notifications', NotificationSchema);

module.exports = Notifications
