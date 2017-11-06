var express = require('express');
var router = express.Router();
var User = require('../controllers/user')


router.get('/', User.findAll);
router.post('/', User.createUser)
router.put('/:id', User.editUser)

module.exports = router;
