var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    nickname: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    role: {type: Number, enum: [001, 010, 011, 100, 110, 101, 111], required: true, default: 001}, //001 => User Rechte; 010 => SuperUser Rechte; 100 => Admin Rechte
    password: {type: String, required: true, select: false}
}, { toObject: { virtuals: true }, toJSON: { virtuals: true }});


module.exports = mongoose.model("User", userSchema);