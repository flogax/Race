var mongoose = require("mongoose");

var colorSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    colorCode: {type: String, required: true}
}, { toObject: { virtuals: true }, toJSON: { virtuals: true }});


module.exports = mongoose.model("Color", colorSchema);
