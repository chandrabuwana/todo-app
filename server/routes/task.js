var express = require('express');
var router = express.Router();
var Task = require('../controllers/task')
var jwt = require('../helpers/jwtToken')

router.post('/', jwt.isLogin,jwt.authUser,Task.createTask)
router.get('/', jwt.isLogin,jwt.authUser,Task.findTask)
router.put('/:_id', jwt.isLogin,jwt.authUser,Task.editTask)
router.delete('/:_id', jwt.isLogin,jwt.authUser,Task.deleteTask)

module.exports = router
