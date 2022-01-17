const express = require('express');
const Role = require('../controllers/role.js');

const router = express.Router();

router.get('/', Role.findAllRoles);
router.post('/', Role.createRole);

module.exports = router