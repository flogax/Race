var mongoose = require("mongoose");

var deckSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cardCount: {type: Number, required: true},
    raceCount: {type: Number, required: true },
    info: {type: String}
}, { toObject: { virtuals: true }, toJSON: { virtuals: true }});


module.exports = mongoose.model("Deck", deckSchema);
