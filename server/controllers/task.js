var Task = require('../models/task')
var ObjectId  = ('mongodb').ObjectId

var createTask = (req, res) => {
  Task.create({
    task        : req.body.task,
    description : req.body.description,
    status      : "undone",
    userid      : req.headers.auth._id || req.headers.id
  })
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.send(err)
  })
}

var findTask = (req, res) => {
  if (req.headers.token == null) {
    res.send("you must login first!")
  }
  else {
    Task.find({
      userid: req.headers.auth._id || req.headers.id
    })
    .populate({path:'userid', select: 'username'})
    .then(taskList => {
      res.send(taskList)
    })
    .catch(err => {
      res.send(err)
    })
  }
}

var editTask = (req, res) => {
  Task.findOne({
    userid: req.headers.auth._id || req.headers.id, _id:req.params._id
  })
  .then(data => {
    Task.updateOne({
      userid: req.headers.auth._id || req.headers.id, _id:req.params._id
    },{
      task        : req.body.task || data.task,
      description : req.body.description || data.description,
      status      : req.body.status || data.status
    })
    .then(dataEdit => {
      res.send(dataEdit)
    })
    .catch(err => {
      res.send(err)
    })
  })
}

var deleteTask = (req, res) => {
  Task.remove({
    userid: req.headers.auth._id || req.headers.id, _id:req.params._id
  })
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res,send(err)
  })
}

module.exports = {
  createTask,
  findTask,
  editTask,
  deleteTask
}
