'use strict';
let express = require('express');
let app = express();
let bodyParser = require('body-parser');


app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let store = [{
    bzip: 'this is the data from the server',
    gittername: 'gitternaaaaame',
}];


app.get('/hi', (req, res) => {
    res.sendFile('public/index.html');
});

app.post('/newItem', function (req, res) {
    console.log(req.body.bzip);
    console.log('hi from post');
    store.push(req.body);
    console.log(store);
    res.send(store);
});

app.get('/data', function (req, res) {
    console.log('hi from get data route');
    res.send({ store: store });
});

// app.get('/', function(req, res){
//     console.log('hi from get "/"');
//     res.render('index');
// });

// app.get('/data', function(req, res){
//     console.log('hi from "data"');
//     res.send({ store: store });
// });
//
// app.post('/newItem', function(req, res){
//     console.log(req.body);
//     console.log('hi from post');
//     store.push(req.body);
//
//     console.log(store);
//     res.send(store);
// });

app.listen(4000);