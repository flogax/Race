var mongoose = require("mongoose"),
    Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");

var SALT_WORK_FACTOR = 10;


var userSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    nickname: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, enum: ['admin', 'op', 'user'], required: true, default: 'user' }, //001 => User Rechte; 010 => SuperUser Rechte; 100 => Admin Rechte
    password: {type: String, required: true, select: false},
    cards: [
        {
            card: {type: Schema.Types.ObjectId, ref: 'Card'},
            stk: Number
        }
    ],
    decks: [
        {type: Schema.Types.ObjectId, ref: 'Deck'}
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