'use strict';
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const schema = new Schema({
    channel:   {type: String, required: true},
    platform:  {type: String, required: true},
    bzip:      {type: String, required: true},
    username:  {type: String, required: true},
    time:      {type: String},
    freeText:  {type: String, required: true}
  },
  {
    collection:'pp'
  }
);

module.exports = mongoose.model('Item', schema);
