const express = require('express');
const Role = require('../controllers/role.js');
const { ensureAuthenticated, hasPermission } = require('../middleware/auth.js');

const router = express.Router();

router.get('/', Role.findAllRoles);
router.post('/create', ensureAuthenticated, hasPermission('role', 'create'), Role.createRole);
router.delete('/delete/:id', ensureAuthenticated, hasPermission('role', 'delete'), Role.deleteRole);

module.exports = router