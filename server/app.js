const express = require ('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo')
const cors = require('cors')
const app =express()
// const mustacheExpress = require('mustache-express')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const index= require('./routes/index')
const user= require('./routes/user')
const task= require('./routes/task')
const userFb= require('./routes/userFb')

app.use('/',index)
app.use('/task',task)
app.use('/user',user)
app.use('/userFb',userFb)

app.listen(3000,function(){
  console.log('Running at 3000');
})
