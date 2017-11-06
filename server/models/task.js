var mongoose = require('mongoose');
var Schema    = mongoose.Schema,
     ObjectId = Schema.ObjectId;

  var Todo = new Schema({
    task:String,
    description: String,
    status: String,
    userid:{
      type  :Schema.Types.ObjectId,
    ref:"users"
  },
  timestamps  : Date
  })

var dataTodo = mongoose.model('dataTodo' ,Todo)


module.exports = dataTodo;
