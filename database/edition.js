var mongoose = require("mongoose");

var editionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    pic: {type: String},
    date: {type: Date, required: true},
    cards: [
        {type: Schema.Types.ObjectId, ref: 'Card'}
    ]
}, { toObject: { virtuals: true }, toJSON: { virtuals: true }});


module.exports = mongoose.model("Edition", editionSchema);