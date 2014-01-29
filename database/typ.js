var mongoose = require("mongoose");

var typSchema = new mongoose.Schema({
    name: {type: String, required: true}
}, { toObject: { virtuals: true }, toJSON: { virtuals: true }});


module.exports = mongoose.model("Typ", typSchema);