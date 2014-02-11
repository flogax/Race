var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var deckSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cardCount: {type: Number, required: true},
    raceCount: {type: Number, required: true },
    info: {type: String},
    cards: [
        {
            card: {type: Schema.Types.ObjectId, ref: 'Card'},
            stk: Number
        }
    ],
    user: {type: Schema.Types.ObjectId, ref: 'User'}
}, { toObject: { virtuals: true }, toJSON: { virtuals: true }});


module.exports = mongoose.model("Deck", deckSchema);
