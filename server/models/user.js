var mongoose = require ('mongoose')
var Schema = mongoose.Schema

var userSchema = new mongoose.Schema({
  username  :{
    type    : String,
    unique  : true
  },
  password  : String,
  name      : String,
  salat     : String
},{
  timestamps: true
})

var users = mongoose.model('users', userSchema)

module.exports = users;
