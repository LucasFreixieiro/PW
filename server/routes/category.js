const express = require('express');
const passport = require('passport');
const Category = require('../controllers/category.js');
const {forwardAuthenticated, ensureAuthenticated, hasPermission} = require('../middleware/auth');

const router = express.Router();
//#region doc
/**
 * @swagger
 *  /category/all:
 *   get:
 *     tags:
 *     - "Category"
 *     summary: "Return all game's categories"
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
 *                      type: integer
 *                      description: Category ID
 *                  description:
 *                      type: string
 *                      description: Category description
 */
//#endregion
router.get('/all', Category.findAllCategories);
//#region doc
/**
 * @swagger
 *  /category/findByID/{id}:
 *   get:
 *     tags:
 *     - "Category"
 *     summary: "Return category"
 *     description: "Return category with specific ID"
 *     operationId: "findByID"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Category ID
 *       required: true
 *       type: integer 
 *     responses:
 *       "200":
 *         description: "Successful operation"
 *         schema:
 *           type: object
 *           properties:
 *              id:
 *                type: integer
 *                description: Category ID
 *              description:
 *                type: string
 *                description: Category description
 */
//#endregion
router.get('/findByID/:id', Category.findByID);
//#region doc
/**
 * @swagger
 *  /category/create:
 *   post:
 *     tags:
 *     - "Category"
 *     summary: "Create category"
 *     description: ""
 *     operationId: ""
 *     requestBody:
 *      required: true
 *      content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  properties:
 *                      description:
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
router.post('/create', ensureAuthenticated, hasPermission('game_categories', 'create'), Category.createCategory);
//#region doc
/**
 * @swagger
 *  /category/delete/{id}:
 *   delete:
 *     tags:
 *     - "Category"
 *     summary: "Delete category"
 *     description: ""
 *     operationId: "delete"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Category ID
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
router.delete('/delete/:id', ensureAuthenticated, hasPermission('game_categories', 'delete'), Category.deleteCategory);

module.exports = router