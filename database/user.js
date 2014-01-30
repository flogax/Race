var mongoose = require("mongoose"),
    Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");

var SALT_WORK_FACTOR = 10;


var userSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    nickname: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    role: {type: Number, enum: [1, 10, 11, 100, 110, 101, 111], required: true, default: 1 }, //001 => User Rechte; 010 => SuperUser Rechte; 100 => Admin Rechte
    password: {type: String, required: true, select: false},
    cards: [
        {
            card: {type: Schema.Types.ObjectId, ref: 'Card'},
            stk: Number
        }
    ]
}, { toObject: { virtuals: true }, toJSON: { virtuals: true }});

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    var user = this;

    bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
        if (err) {
            return next(err);
        }

        user.password = hash;
        next();
    });
});

userSchema.methods.isValidPassword = function (passwd) {
    return bcrypt.compareSync(passwd, this.password);
};

userSchema.methods.showUserNick = function () {
    console.info(this.nickname + ":" + this.role);
};

module.exports = mongoose.model("User", userSchema);