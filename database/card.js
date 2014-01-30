var mongoose = require("mongoose");

var cardSchema = new mongoose.Schema({
    name: {type: String, require: true},
    typ: {type: Schema.Types.ObjectId, ref: 'Typ', required: true},// SOll eigentlich über die Db Typ gesetzt werden
    color: [
        {type: Schema.Types.ObjectId, ref: 'Color'}
    ],//SOll eigentlich über die Db color gesetzt werden
    cost: {type: Number, required: true},
    live: Number,
    atk: Number,
    ver: Number,
    ability: String,
    text: String,
    info: String,
    pic: String,
    edition: {type: Schema.Types.ObjectId, ref: 'Edition', required: true}, //SOll eigentlich über die Db Edition gesetzt werden
    creationDate: Date,
    relaseDate: Date,
    changeDate: Date,
    version: Number,
    hidden: Boolean
}, { toObject: { virtuals: true }, toJSON: { virtuals: true }});


module.exports = mongoose.model("Card", cardSchema);
