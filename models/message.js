var mongoose = require("mongoose")
var User = require("./user")
var Channel = require("./channel")

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const messageSchema = new Schema({
    messageBody: String, default: "",
    timeStamp: {type: Date, default: Date.now},
    userId: {type: ObjectId, ref: 'User'},
    channelId: {type: ObjectId, ref: 'Channel'},
    userName: String, default: "",
    userAvatar: String, default: "",
    userAvatarColor: String, default: ""
});

module.exports = mongoose.model('Message', messageSchema);
