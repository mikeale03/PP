const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/item')
let route = express.Router();


route.delete('/:id', (req, res) => {
  console.log('delete requested!');
  console.log(req.params);
  Item.findByIdAndRemove(req.params.id, function (err, item) {
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    if(err) {
      res.status(err.status || 500);
      res.send( err.message );
    } else if(item) {
      res.status(200);
      res.send('item succesfully deleted!');
    } else {
      res.status(202);
      res.send('item already deleted!');
    }
  });
});

route.get('/', (req, res) => {
    console.log('new item requested!');
    Item.find({}, function (err, result) {
      if (err) throw err;
      res.send({ store: result });
      console.log('result');
      console.log(result);
    });
});

route.post('/create', function (req, res) {
  console.log('message from server!');
  console.log(req.body);
  let item = new Item(req.body);
  item.save( (err, result) => {
    if(err) {
      res.status(500);
      res.send(err.message);
    }
    else {
      res.status(201);
      res.send( 'item created!');
    }
  });
});

module.exports = route;
