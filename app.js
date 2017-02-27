'use strict';
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://fcc-pp:codepair@ds151008.mlab.com:51008/mongotest03');



//app.set("view engine", "ejs");
//app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/build'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.get('/', function(req, res){
  console.log('home has been hit');
    res.sendFile( __dirname + '/build/index.html');
});
let itemRoute = require('./item-route');
app.use('/items',itemRoute);
app.listen(4000, () => {
  console.log('listening on 4000');
});
