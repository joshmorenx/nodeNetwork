const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = require("./User.js");

const RelationshipSchema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: UserSchema },
    to: { type: Schema.Types.ObjectId, ref: UserSchema },
    date_created: { type: Date, default: Date.now() },
    date_updated: { type: Date, default: Date.now() },
});

const Relationships = mongoose.model("Relationship", RelationshipSchema);

module.exports = Relationships