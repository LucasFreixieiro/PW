const express = require('express');
const passport = require('passport');
const Game = require('../controllers/game.js');
var multer  = require('multer');
const {forwardAuthenticated, ensureAuthenticated, hasPermission} = require('../middleware/auth');

const router = express.Router();

// Defines storage where we go to upload banners
const storage = multer.diskStorage({
    destination: (req, dir, cb) => {
        cb(null, "static/games/tmp")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() +  '' + file.originalname)
    }
});
const upload = multer({storage: storage});

//#region doc
/**
 * @swagger
 *  /game/all:
 *   get:
 *     tags:
 *     - "Game"
 *     summary: "Return all games"
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
 *                   description: Game ID
 *                  title:
 *                   type: string
 *                   description: Game title
 *                  description:
 *                   type: string
 *                   description: Game description
 *                  release_date:
 *                   type: string
 *                   description: Game release date
 */
//#endregion
router.get('/all', Game.findAllGames);
//#region doc
/**
 * @swagger
 *  /game/findByID/{id}:
 *   get:
 *     tags:
 *     - "Game"
 *     summary: "Return game"
 *     description: "Return game with specific ID"
 *     operationId: "findByID"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Game ID
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
 *                      description: Game ID
 *                  title:
 *                      type: string
 *                      description: Game title
 *                  description:
 *                      type: string
 *                      description: Game description
 *                  release_date:
 *                      type: string
 *                      description: Game release date
 */
//#endregion
router.get('/findByID/:id', Game.findByID);
//#region doc
/**
 * @swagger
 *  /game/categories/{id}:
 *   get:
 *     tags:
 *     - "Game"
 *     summary: "Return game categories"
 *     description: "Return game categories with specific game ID"
 *     operationId: "findGameCategories"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Game ID
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
 *                      description: Category ID
 *                  description:
 *                      type: string
 *                      description: Category description
 */
//#endregion
router.get('/categories/:id', Game.findGameCategories);
//#region doc
/**
 * @swagger
 *  /game/images/{id}:
 *   get:
 *     tags:
 *     - "Game"
 *     summary: "Return game images"
 *     description: "Return game images with specific game ID"
 *     operationId: "findImages"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Game ID
 *       required: true
 *       type: integer 
 *     responses:
 *       "200":
 *         description: "Successful operation"
 *         schema:
 *           type: array
 *           items:
 *              properties:
 *                  type: string
 */
//#endregion
router.get('/images/:id', Game.findImages);
//#region doc
/**
 * @swagger
 *  /game/create:
 *   post:
 *     tags:
 *     - "Game"
 *     summary: "Create game"
 *     description: ""
 *     operationId: ""
 *     requestBody:
 *      required: true
 *      content:
 *          multipart/form-data:
 *              schema:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *                      description:
 *                          type: string
 *                      release_date:
 *                          type: string
 *                      files:
 *                          type: array
 *                          items:
 *                              type: string
 *                              format: binary
 *     responses:
 *       "200":
 *         description: "Successful operation"
 *       "400":
 *         description: "Fields missing"
 *       "403":
 *         description: "Don't have permissions"
 */
//#endregion
router.post('/create', ensureAuthenticated, hasPermission('game', 'create'), upload.array('files'), Game.createGame);
//#region doc
/**
 * @swagger
 *  /game/update:
 *   put:
 *     tags:
 *     - "Game"
 *     summary: "Update game"
 *     description: ""
 *     operationId: "update"
 *     requestBody:
 *      required: true
 *      content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: string
 *                      title:
 *                          type: string
 *                      description:
 *                          type: string
 *                      release_date:
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
router.put('/update', ensureAuthenticated, hasPermission('game', 'edit'), Game.update);
//#region doc
/**
 * @swagger
 *  /game/addImage/{id}:
 *   put:
 *     tags:
 *     - "Game"
 *     summary: "Add image to game"
 *     description: ""
 *     operationId: ""
 *     requestBody:
 *      required: true
 *      content:
 *          multipart/form-data:
 *              schema:
 *                  type: object
 *                  properties:
 *                      files:
 *                          type: array
 *                          items:
 *                              type: string
 *                              format: binary
 *     responses:
 *       "200":
 *         description: "Successful operation"
 *       "400":
 *         description: "Fields missing"
 *       "404":
 *         description: "Game doesn't exist"
 *       "403":
 *         description: "Don't have permissions"
 */
//#endregion
router.put('/addImage/:id', ensureAuthenticated, upload.array('files'), hasPermission('game', 'edit'), Game.addImages);
//#region doc
/**
 * @swagger
 *  /game/removeImage:
 *   delete:
 *     tags:
 *     - "Game"
 *     summary: "Remove game image from server"
 *     description: ""
 *     operationId: ""
 *     parameters:
 *     - name: gameID
 *       in: query
 *       description: Game ID
 *       required: true
 *       type: integer
 *     - name: imageName
 *       in: query
 *       description: Image name
 *       required: require
 *       type: string 
 *     responses:
 *       "200":
 *         description: "Successful operation"
 *       "400":
 *         description: "Fields missing"
 *       "403":
 *         description: "Don't have permissions"
 */
//#endregion
router.delete('/removeImage', ensureAuthenticated, hasPermission('game', 'edit'), Game.removeImage);
//#region doc
/**
 * @swagger
 *  /game/addCategory:
 *   post:
 *     tags:
 *     - "Game"
 *     summary: "Add category to game"
 *     description: ""
 *     operationId: ""
 *     parameters:
 *     - name: gameID
 *       in: query
 *       description: Game ID
 *       required: true
 *       type: integer
 *     - name: categoryID
 *       in: query
 *       description: Category ID
 *       required: true
 *       type: integer
 *     responses:
 *       "200":
 *         description: "Successful operation"
 *       "400":
 *         description: "Fields missing"
 *       "404":
 *         description: "Game doesn't exist"
 *       "403":
 *         description: "Don't have permissions"
 */
//#endregion
router.post('/addCategory', ensureAuthenticated, hasPermission('game', 'edit'), Game.addCategory);
//#region doc
/**
 * @swagger
 *  /game/removeCategory:
 *   delete:
 *     tags:
 *     - "Game"
 *     summary: "Remove category from game"
 *     description: ""
 *     operationId: ""
 *     parameters:
 *     - name: gameID
 *       in: query
 *       description: Game ID
 *       required: true
 *       type: integer
 *     - name: categoryID
 *       in: query
 *       description: Category ID
 *       required: true
 *       type: integer
 *     responses:
 *       "200":
 *         description: "Successful operation"
 *       "400":
 *         description: "Fields missing"
 *       "404":
 *         description: "Game doesn't exist"
 *       "403":
 *         description: "Don't have permissions"
 */
//#endregion
router.delete('/removeCategory', ensureAuthenticated, hasPermission('game', 'edit'), Game.removeCategory);
//#region doc
/**
 * @swagger
 *  /game/delete/{id}:
 *   delete:
 *     tags:
 *     - "Game"
 *     summary: "Delete game"
 *     description: ""
 *     operationId: "delete"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Game ID
 *       required: true
 *       type: integer 
 *     responses:
 *       "200":
 *         description: "Successful operation"
 *       "400":
 *         description: "Fields missing"
 *       "403":
 *         description: "Don't have permissions"
 */
//#endregion
router.delete('/delete/:id', ensureAuthenticated, hasPermission('game', 'delete'), Game.deleteGame);

module.exports = router
