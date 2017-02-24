const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const schema = new Schema({
    bzip: {type: String, required: true},
    gittername: {type: String, required: true},
    when:{type: String}
  },
  {
    collection:'pp'
  }
);

module.exports = mongoose.model('Item', schema);
