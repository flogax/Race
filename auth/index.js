var Q = require('q');
var User = require('../database').User;

var roles = {
    user: 1,    // 001
    op: 2,      // 010
    admin: 4    // 100
};

var accessLevels = {
    admin: roles.admin,
    operrator: roles.admin | roles.op,
    registered: roles.admin | roles.op | roles.user,
    public: roles.admin | roles.op | roles.user
};

exports.restrictTo = function (accessLevel) {
    return function (req, res, next) {
        if (!req.session.user) {
            res.send(401); // unauthorized
        } else if (roles[req.session.user.role] & accessLevels[accessLevel]) {
            next();
        } else {
            res.send(403, 'permission denied'); // forbidden
        }
    }
};

exports.authenticate = function (req, res, next) {
    var nickname = req.body.username;
    var password = req.body.password;

    if (!nickname || !password) {
        res.send(400, 'nickname or password is missing'); // bad request
        return;
    }

    Q.when(User.findOne({ nickname: nickname }).select('+password').populate('decks card').exec())
        .then(function (user) {
            if (!user) {
                res.send(401, 'wrong credentials'); // unauthorized
            } else if (user.isValidPassword(password)) {
                req.session.regenerate(function (err) {
                    if (err) {
                        next(err);
                        return;
                    }
                    req.session.user = user;
                    user = user.toJSON();
                    delete user.password; // do not transmit hashes over network
                    res.json(200, user); // ok
                });
            } else {
                res.send(401, 'wrong credentials'); // unauthorized
            }
        }).catch(next);

};

exports.revokeAuth = function (req, res, next) {
    req.session.destroy(function (err) {
        if (err) {
            next(err);
            return;
        }

        res.send(204); // no content
    });
};

exports.check = function (req, res) {
    if (req.session.user) {
        var user = req.session.user;
        delete user.password;
        res.json(200, req.session.user); // ok
    } else {
        res.send(401); // unauthorized
    }
};