'use strict';

const request = require("tinyreq");
const cheerio = require('cheerio');

var part;

request("https://www.freecodecamp.com/map", function (err, body) {
    part = cheerio.load(body);
    exports.default = part(".challenge-title").text().split(' Incomplete').map(function(v){
        return v.trim().replace('*', '');
    }).filter(function(v){
        return !/Coming soon/ig.test(v);
    });
});
