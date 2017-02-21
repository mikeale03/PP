'use strict';
let express = require('express');
let app = express();
let bodyParser = require('body-parser');


app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*
let store = [{
    bzip: 'this is the data from the server',
    gittername: 'mike',
}];
*/

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://fcc-pp:codepair@ds151008.mlab.com:51008/mongotest03', (err, db) => {
  if(err) {
    return console.log(err);
  }

  app.post('/newItem', function (req, res) {
    if (err) throw err;
    console.log('message from server!');
    db.collection('pp').insertOne(req.body);
    db.collection('pp').find().toArray(function (err, result) {
      if (err) throw err
      res.send({ store: result });
      console.log(result);
    });
    
    /*
        res.send({ store: result });
      })
        console.log(req.body);
        console.log('hi from post');
        store.push(req.body);
        console.log(store);
        res.send(store);
    */
  });

  app.get('/data', function (req, res) {
      console.log('hi from get data route');
      db.collection('pp').find().toArray(function (err, result) {
        if (err) throw err
        res.send({ store: result });
      })
  });

  app.listen(4000, () => {
      console.log('listening on 4000');
  });
});