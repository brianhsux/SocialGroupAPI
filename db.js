var mongoose = require("mongoose");

// module.exports = callback => {
module.exports = function(callback) {
    var db;
    // Connect to the database before starting the application server.
    mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true }, function (err, database) {
    // mongoose.connect(process.env.DATABASEURL, function (err, database) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        
        // Save database object from the callback for reuse.
        db = database;
        console.log("Database connection ready");
        callback(db);
    });
}
