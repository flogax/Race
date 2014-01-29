var mongoose = require("mongoose");

var cardSchema = new mongoose.Schema({
    name: String,
    typ: String,// SOll eigentlich über die Db Typ gesetzt werden
    color: String,//SOll eigentlich über die Db color gesetzt werden
    cost: Number,
    live: Number,
    atk: Number,
    ver: Number,
    ability: String,
    text: String,
    info: String,
    pic: String,
    edition: String, //SOll eigentlich über die Db Edition gesetzt werden
    creationDate: Date,
    relaseDate: Date,
    changeDate: Date,
    version: Number,
    hidden: Boolean
}, { toObject: { virtuals: true }, toJSON: { virtuals: true }});


module.exports = mongoose.model("Card", cardSchema);
