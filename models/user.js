var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    email: String,
    avatarName: String,
    avatarColor: String
});

module.exports = mongoose.model("User", userSchema);
