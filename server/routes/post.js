const express = require('express');
const passport = require('passport');
const Post = require('../controllers/post.js');
const {forwardAuthenticated, ensureAuthenticated, hasPermission} = require('../middleware/auth');

const router = express.Router();

router.get('/all', Post.findAll);
router.get('/:id', Post.findByID);
router.post('/create', ensureAuthenticated, hasPermission('post', 'create'), Post.createPost);

module.exports = router