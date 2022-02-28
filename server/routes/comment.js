const express = require('express');
const passport = require('passport');
const Comment = require('../controllers/comment.js');
const {forwardAuthenticated, ensureAuthenticated, hasPermission} = require('../middleware/auth');

const router = express.Router();


//#region doc
/**
 * @swagger
 *  /comment/all:
 *   get:
 *     tags:
 *     - "Comment"
 *     summary: "Return all comments"
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
 *                      description: Comment ID
 *                  user:
 *                      type: integer
 *                      description: User ID of who posted
 *                  post:
 *                      type: integer
 *                      description: Post ID
 *                  parent:
 *                      type: integer
 *                      description: Parent comment
 *                  content:
 *                      type: string
 *                      description: Comment content
 */
//#endregion
router.get('/all', Comment.findAllComments);
//#region doc
/**
 * @swagger
 *  /comment/findByID/{id}:
 *   get:
 *     tags:
 *     - "Comment"
 *     summary: "Return category"
 *     description: "Return comment with specific ID"
 *     operationId: "findByID"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Comment ID
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
 *                      description: Comment ID
 *                  user:
 *                      type: integer
 *                      description: User ID of who posted
 *                  post:
 *                      type: integer
 *                      description: Post ID
 *                  parent:
 *                      type: integer
 *                      description: Parent comment
 *                  content:
 *                      type: string
 *                      description: Comment content
 */
//#endregion
router.get('/findByID/:id', Comment.findByID);
//#region doc
/**
 * @swagger
 *  /comment/create:
 *   post:
 *     tags:
 *     - "Comment"
 *     summary: "Create comment"
 *     description: ""
 *     operationId: ""
 *     parameters:
 *     - name: postID
 *       in: query
 *       description: Post ID
 *       required: true
 *       type: integer
 *     - name: parentID
 *       in: query
 *       description: Comment parent ID
 *       required: false
 *       type: integer 
 *     requestBody:
 *      required: true
 *      content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  properties:
 *                      content:
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
router.post('/create', ensureAuthenticated, Comment.createComment);
//#region doc
/**
 * @swagger
 *  /comment/update:
 *   post:
 *     tags:
 *     - "Comment"
 *     summary: "Update comment"
 *     description: ""
 *     operationId: ""
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Comment ID
 *       required: true
 *       type: integer
 *     requestBody:
 *      required: true
 *      content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  properties:
 *                      content:
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
router.put('/update/:id', ensureAuthenticated, Comment.update);
//#region doc
/**
 * @swagger
 *  /comment/delete/{id}:
 *   delete:
 *     tags:
 *     - "Comment"
 *     summary: "Delete comment"
 *     description: ""
 *     operationId: "delete"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Comment ID
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
router.delete('/delete/:id', ensureAuthenticated, Comment.deleteComment);

module.exports = router