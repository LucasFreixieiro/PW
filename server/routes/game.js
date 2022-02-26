const express = require('express');
const passport = require('passport');
const Game = require('../controllers/game.js');
const {forwardAuthenticated, ensureAuthenticated, hasPermission} = require('../middleware/auth');

const router = express.Router();

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
router.get('/all', Game.findAllGames);
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
router.get('/findByID/:id', Game.findByID);
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
 *          application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  properties:
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
router.post('/create', ensureAuthenticated, hasPermission('game', 'create'), Game.createGame);
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
router.delete('/delete/:id', ensureAuthenticated, hasPermission('game', 'delete'), Game.deleteGame)

module.exports = router
