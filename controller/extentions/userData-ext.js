var mongoose = require("mongoose");
var UserData = require("../../models/user")

class UserDataExt {
    static findUserByEmail(email, callback) {
        UserData.findOne({ 'email': email }, (err, userData) => {
            if (err) {
                console.log("err: " + err);
                return callback(err, null);
            } else{
                console.log("userData: " + userData);
                return callback(null, userData);
            }
        });
    }
}

module.exports = UserDataExt;
