const express = require('express');
const passport = require('passport');
const User = require('../controllers/user.js');
const {forwardAuthenticated, ensureAuthenticated, hasPermission} = require('../middleware/auth');


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
//#region doc
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
//#endregion
router.get('/findByid/:id', User.findByID);

router.get('/hasPermission/:controller', ensureAuthenticated, User.hasPerm);

router.get('/gameList', ensureAuthenticated, User.gameList);

//#region doc
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
//#endregion
router.post('/register', User.createUser);
//#region doc
/**
 * @swagger
 *  /user/update/general:
 *   put:
 *     tags:
 *     - "User"
 *     summary: "Update basic user info"
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
 *     responses:
 *       "200":
 *         description: "Successful operation"
 *       "400":
 *         description: "Fields missing"
 *       "403":
 *         description: "Don't have permissions"
 */
//#endregion
router.put('/update/general', ensureAuthenticated, User.update);
//#region doc
/**
 * @swagger
 *  /user/update/password:
 *   put:
 *     tags:
 *     - "User"
 *     summary: "Update user password"
 *     description: ""
 *     operationId: ""
 *     requestBody:
 *      required: true
 *      content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  properties:
 *                     oldPassword:
 *                         type: string
 *                         description: User current password
 *                     password:
 *                         type: string
 *                         description: User new password
 *     responses:
 *       "200":
 *         description: "Successful operation"
 *       "400":
 *         description: "Fields missing"
 *       "403":
 *         description: "Don't have permissions"
 */
//#endregion
router.put('/update/password', ensureAuthenticated, User.updatePassword);

router.post('/insertGame/:game_id', ensureAuthenticated, User.insertGame);

router.delete('/removeGame/:game_id', ensureAuthenticated, User.removeGame);

router.delete('/delete/:id', ensureAuthenticated, User.delete);
//#region doc
/**
 * @swagger
 *  /user/update/avatar:
 *   put:
 *     tags:
 *     - "User"
 *     summary: "Update user avatar"
 *     description: ""
 *     operationId: ""
 *     requestBody:
 *      required: true
 *      content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  properties:
 *                     file:
 *                         type: string
 *                         description: binary
 *     responses:
 *       "200":
 *         description: "Successful operation"
 *       "400":
 *         description: "Fields missing"
 *       "403":
 *         description: "Don't have permissions"
 */
//#endregion
router.put('/update/avatar', ensureAuthenticated, User.updateAvatar);
//#region doc
/**
 * @swagger
 *  /user/update/role:
 *   put:
 *     tags:
 *     - "Game"
 *     summary: "Add image to post"
 *     description: ""
 *     operationId: ""
 *     parameters:
 *     - name: id
 *       in: query
 *       description: User ID
 *       required: true
 *       type: integer 
 *     - name: roleID
 *       in: query
 *       description: Role ID
 *       required: true
 *       type: integer
 *     responses:
 *       "200":
 *         description: "Successful operation"
 *       "400":
 *         description: "Fields missing"
 *       "404":
 *         description: "Post doesn't exist"
 *       "403":
 *         description: "Don't have permissions"
 */
//#endregion
router.put('/update/role', ensureAuthenticated, hasPermission('user', 'updateRole'), User.updateRole);

//#region doc
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
//#endregion
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
            return res.status(200).send({message: "Logged", user: {id: user[0].id, nickname: user[0].nickname, avatar: user[0].avatar, role_id: user[0].role_id}});
        });
    })(req, res, next);
});
router.get('/logout', ensureAuthenticated, User.closeConnection);


module.exports = router