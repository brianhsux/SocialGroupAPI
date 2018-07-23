var mongoose = require("mongoose"),
    config = require("./config");

// module.exports = callback => {
module.exports = function(callback) {
    var db;
    // Connect to the database before starting the application server.
    mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true }, function (err, database) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        
        console.log(process.env.DATABASEURL);
        // Save database object from the callback for reuse.
        db = database;
        console.log("Database connection ready");
        callback(db);
    });
}
