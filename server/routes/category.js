const express = require('express');
const passport = require('passport');
const Category = require('../controllers/category.js');
const {forwardAuthenticated, ensureAuthenticated, hasPermission} = require('../middleware/auth');

const router = express.Router();

router.get('/all', Category.findAllCategories);
router.get('/:id', Category.findByID);
router.post('/create', ensureAuthenticated, hasPermission('game_categories', 'create'), Category.createCategory);
router.delete('/delete/:id', ensureAuthenticated, hasPermission('game_categories', 'delete'), Category.deleteCategory);

module.exports = router