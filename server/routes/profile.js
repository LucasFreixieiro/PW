const express = require('express');
const passport = require('passport');
const Profile = require('../controllers/profile.js');
const {forwardAuthenticated, ensureAuthenticated} = require('../middleware/auth');

const router = express.Router();

router.get('/:id', ensureAuthenticated, Profile.findProfileByID);

module.exports = router