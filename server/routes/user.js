const express = require('express');
const User = require('../controllers/user.js');

const router = express.Router();

router.get('/', User.findAllUsers);
router.get('/findByid/:id', User.findByID);
router.get('/hasPermission/', User.hasPermission);
router.post('/', User.createUser);


module.exports = router