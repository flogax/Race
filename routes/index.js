
/*
 * GET home page.
 */
var path = require('path');

exports.index = function(req, res){
    res.sendfile("index.html", { root: path.resolve(__dirname, "../views") });
};