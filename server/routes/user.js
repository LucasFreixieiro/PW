const express = require('express');
const passport = require('passport');
const User = require('../controllers/user.js');
const {forwardAuthenticated, ensureAuthenticated} = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 *  /user/:
 *   get:
 *     tags:
 *     - "User"
 *     summary: "Return all users"
 *     description: ""
 *     operationId: "all"
 *     produces:
 *     - "application/json"
 *     parameters: []
 *     responses:
 *       "200":
 *         description: "Successful operation"
 *         schema:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  id:
 *                   type: integer
 *                   description: User ID
 *                  nickname:
 *                   type: string
 *                   description: User nickname
 *                  email:
 *                   type: string
 *                   description: User email
 *                  role_id:
 *                   type: integer
 *                   description: User role ID
 */
router.get('/', ensureAuthenticated, User.findAllUsers);
/**
 * @swagger
 *  /user/findByid/{id}:
 *   get:
 *     tags:
 *     - "User"
 *     summary: "Return user"
 *     description: "Return user with specific ID"
 *     operationId: "findByID"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: id
 *       in: path
 *       description: User ID
 *       required: true
 *       type: integer 
 *     responses:
 *       "200":
 *         description: "Successful operation"
 *         schema:
 *           type: object
 *           properties:
 *                  id:
 *                      type: integer
 *                      description: User ID
 *                  nickname:
 *                      type: string
 *                      description: User nickname
 *                  email:
 *                      type: string
 *                      description: User email
 *                  role_id:
 *                      type: integer
 *                      description: User role ID
 *                  avatar:
 *                      type: string
 *                      description: User avatar
 */
router.get('/findByid/:id', User.findByID);
router.get('/hasPermission/', User.hasPermission);
/**
 * @swagger
 *  /user/register:
 *   post:
 *     tags:
 *     - "User"
 *     summary: "Create user"
 *     description: ""
 *     operationId: ""
 *     requestBody:
 *      required: true
 *      content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  properties:
 *                     nickname:
 *                         type: string
 *                         description: User nickname
 *                     email:
 *                         type: string
 *                         description: User email
 *                     password:
 *                         type: string
 *                         description: User password
 *                     avatar:
 *                         type: string
 *                         description: User avatar
 *     responses:
 *       "200":
 *         description: "Successful operation"
 *       "400":
 *         description: "Fields missing"
 *       "403":
 *         description: "Don't have permissions"
 */
router.post('/register', User.createUser);
/**
 * @swagger
 *  /user/login:
 *   post:
 *     tags:
 *     - "User"
 *     summary: "Login"
 *     description: ""
 *     operationId: ""
 *     requestBody:
 *      required: true
 *      content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                      password:
 *                          type: string
 *     responses:
 *       "200":
 *         description: "Successful operation"
 *       "400":
 *         description: "Fields missing"
 *       "403":
 *         description: "Don't have permissions"
 */
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
            return res.status(200).send({message: "Logged", user: {id: user[0].id, nickname: user[0].nickname, avatar: user[0].avatar}});
        });
    })(req, res, next);
});
router.post('/logout', ensureAuthenticated, User.closeConnection);


module.exports = router