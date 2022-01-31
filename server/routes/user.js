const express = require('express');
const passport = require('passport');
const User = require('../controllers/user.js');
const {forwardAuthenticated, ensureAuthenticated} = require('../middleware/auth');

const router = express.Router();

router.get('/', ensureAuthenticated, User.findAllUsers);
router.get('/findByid/:id', User.findByID);
router.get('/hasPermission/', User.hasPermission);
router.post('/register', User.createUser);
router.post('/login', forwardAuthenticated, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            return next(err);
        }
        if(!user) {
            return res.status(403).send("err");
        }
        req.logIn(user, (err) => {
            if(err) {
                return res.status(500).send(info);
            }
            return res.status(200).send({message: "Logged", user: user});
        });
    })(req, res, next);
});
router.post('/logout', ensureAuthenticated, User.closeConnection);


module.exports = router