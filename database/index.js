var mongoose = require("mongoose");

var dbUri = "mongodb://localhost/racetest";
var options = { user: "", password: "" };

mongoose.connection.on("open", function () {
    console.info("Connection opened to mongodb at %s", dbUri);
    process.emit("rtc-DBOpen");
});
mongoose.connection.on("error", function (err) {
    console.error("Connection to mongodb failed: %s\nnode is shutting down...", err);
    process.exit(1);
});

console.info("Connecting to %s", dbUri);
mongoose.connect(dbUri, options);

module.exports.User = require("./user");
module.exports.Deck = require("./deck");
module.exports.Edition = require("./edition");
module.exports.Card = require("./card");
module.exports.Color = require("./color");
module.exports.News = require("./news");
module.exports.Typ = require("./typ");