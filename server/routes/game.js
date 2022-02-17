const express = require('express');
const passport = require('passport');
const Game = require('../controllers/game.js');
const {forwardAuthenticated, ensureAuthenticated, hasPermission} = require('../middleware/auth');

const router = express.Router();

router.get('/all', Game.findAllGames);
router.get('/:id', Game.findByID);
router.post('/create', ensureAuthenticated, hasPermission('game', 'create'), Game.createGame);

module.exports = router