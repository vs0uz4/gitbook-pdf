#! /usr/bin/env node

// Requires
var Q = require('q');
var _ = require('lodash');
var path = require('path');
var prog = require('commander');

var pkg = require("../package.json");
var pdf = require("../lib/index.js");

var logError = function(err) {
    console.log(err.message || err);
    return Q.reject(err);
};

// General options
prog
.version(pkg.version);

prog
.command('generate [input] [output]')
.description('Generate a PDF file from an HTML file')

.action(function(input, output, options) {
    pdf.generate(input, output)
    .then(function() {
        console.log("Done!");
    }, logError);
});

// Parse and fallback to help if no args
if(_.isEmpty(prog.parse(process.argv).args) && process.argv.length === 2) {
    prog.help();
}
