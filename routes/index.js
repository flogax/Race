
/*
 * GET home page.
 */
var Q = require('q');
var path = require('path');
var database = require('../database');

var News = database.News;

exports.index = function(req, res){
    res.sendfile("index.html", { root: path.resolve(__dirname, "../views") });
};

exports.news = function (req, res, next) {
    Q.when(News.find().exec()).then(function (result) {
        res.json(result);
    }).catch(next);
};