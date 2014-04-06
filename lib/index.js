var Q = require('q');
var path = require('path');
var exec = require('child_process').exec;

// PhantomJS binary
var PHANTOMJS = path.resolve(__dirname, "../node_modules/.bin/phantomjs");
var RASTERIZE = path.resolve(__dirname, "rasterize.js");

var generate = function(input, output, options) {
    var d = Q.defer();
    options = options || {};
    var command = [
        PHANTOMJS,
        RASTERIZE,
        input,
        output,
        options.format || "A4"
    ].join(" ");

    var child = exec(command, function (error, stdout, stderr) {
        if (error) {
            error.message = error.message + " "+stdout;
            return d.reject(error);
        }
        d.resolve();
    });

    return d.promise;
};

module.exports = {
    generate: generate
};