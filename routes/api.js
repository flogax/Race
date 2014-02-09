"use strict";

var Q = require('q');
var bcrypt = require("bcryptjs");

var SALT_WORK_FACTOR = 10;

var api = {
    findAllCards: function (Card) {
        return function (req, res, next) {
            Card.find({}).populate('typ edition color').exec(function (err, data) {
                if (err) {
                    console.error("Error finding %ss: %j", Model.modelName, err);
                    return res.json(500, err);
                } else if (!data) {
                    return res.json(404);
                }
                res.json(data);
            });
        }
    },

    findAll: function (model) {
        return function (req, res, next) {
            model.find({}, function (err, data) {
                if (err) {
                    console.error("Error finding %ss: %j", Model.modelName, err);
                    return res.json(500, err);
                } else if (!data) {
                    // TODO use maybe a better statuscode (empy response?)
                    return res.json(404);
                }
                res.json(data);
            })
        };
    },

    find: function (model) {
        return function (req, res, next) {
            model.findById(req.params.id, function (err, data) {
                if (err) {
                    console.error("Error finding %s with ID %s: %j", Model.modelName, req.id, err);
                    return res.json(500, err);
                } else if (!data) {
                    return res.send(404);
                }
                res.json(data);
            });
        };
    },

    add: function (Model) {
        return function (req, res, next) {
            var instance = new Model(req.body);
            instance.save(function (err) {
                if (err) {
                    console.error("Error creating %s: %j", Model.modelName, err);
                    return res.json(500, err);
                }

                var uri = req.url + "/" + instance._id;
                res.location(uri);
                // delete password so that the hash is not transmitted
                delete instance.password;
                res.json(201, instance);
            });
        };
    },

    update: function (Model) {
        return function (req, res, next) {
            var id = req.params.id;
            // delete _id to avoid an exception by trying to modify _id
            delete req.body._id;

            // workaround which is needed to update passwords:
            // because mongoose doesnt provide hooks on update calls
            // the password cannot be intercepted and hashed
            if (req.body.password) {
                req.body.password = bcrypt.hashSync(req.body.password, SALT_WORK_FACTOR);
            }
            Model.findByIdAndUpdate(id, req.body, function (err, instance) {
                if (err) {
                    console.error("Error updating %s with ID %s: %j", Model.modelName, id, err);
                    res.json(500, err);
                }

                res.json(instance);
            });
        };
    },

    remove: function (Model) {
        return function (req, res, next) {
            var id = req.params.id;
            Model.findByIdAndRemove(id, req.body, function (err) {
                if (err) {
                    console.error("Error deleting %s with ID %s: %j", Model.toString, id, err);
                    res.json(500, err);
                }
                res.send(204);
            });
        };
    },

    listMethods: function (methods) {
        return function (req, res) {
            res.writeHeader(405, { Allow: methods });
            res.end();
        };
    }
};

module.exports = api;