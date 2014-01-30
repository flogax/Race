var mongoose = require("mongoose");

var newsSchema = new mongoose.Schema({
    header: {type: String, required: true},
    message: {type: String, required: true},
    date: { type: Date, required: true}
}, { toObject: { virtuals: true }, toJSON: { virtuals: true }});

newsSchema.methods.dateMeUp = function () {
    console.info(this.header + ":" + this.message);
};

module.exports = mongoose.model("News", newsSchema);
