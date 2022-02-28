const express = require('express');
const passport = require('passport');
const Post = require('../controllers/post.js');
const {forwardAuthenticated, ensureAuthenticated, hasPermission} = require('../middleware/auth');

const router = express.Router();

//#region doc
/**
 * @swagger
 *  /post/all:
 *   get:
 *     tags:
 *     - "Post"
 *     summary: "Return all posts"
 *     description: ""
 *     operationId: "all"
 *     produces:
 *     - "application/json"
 *     parameters: []
 *     responses:
 *       "200":
 *         description: "Successful operation"
 *         schema:
 *              type: array
 *              items:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: integer
 *                          description: Post ID
 *                      title:
 *                          type: string
 *                          description: Post title
 *                      image:
 *                          type: string
 *                          description: Post image
 *                      comments:
 *                          type: integer
 *                          description: Amount of comments
 *                      likes:
 *                          type: integer
 *                          description: Amount of likes
 *                      dislikes:
 *                          type: integer
 *                          description: Amount of dislikes
 */
//#endregion
router.get('/all', Post.findAll);
//#region doc
/**
 * @swagger
 *  /post/findByID/{id}:
 *   get:
 *     tags:
 *     - "Post"
 *     summary: "Return post"
 *     description: "Return post with specific ID"
 *     operationId: "findByID"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Post ID
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
 *                      description: Post ID
 *                  title:
 *                      type: string
 *                      description: Post title
 *                  image:
 *                      type: string
 *                      description: Post image
 *                  comments:
 *                      type: integer
 *                      description: Amount of comments
 *                  likes:
 *                      type: integer
 *                      description: Amount of likes
 *                  dislikes:
 *                      type: integer
 *                      description: Amount of dislikes
 */
//#endregion
router.get('/findByID/:id', Post.findByID);
//#region doc
/**
 * @swagger
 *  /post/create:
 *   post:
 *     tags:
 *     - "Post"
 *     summary: "Create post"
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
 *                      image:
 *                          type: file
 *                      game_id:
 *                          type: integer
 *     responses:
 *       "200":
 *         description: "Successful operation"
 *       "400":
 *         description: "Fields missing"
 *       "403":
 *         description: "Don't have permissions"
 */
//#endregion
router.post('/create', ensureAuthenticated, hasPermission('post', 'create'), Post.createPost);
//#region doc
/**
 * @swagger
 *  /post/update:
 *   put:
 *     tags:
 *     - "Post"
 *     summary: "Update post"
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
 *                      game_id:
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
router.put('/update', ensureAuthenticated, Post.update);
//#region doc
/**
 * @swagger
 *  /post/insertImage/{id}:
 *   put:
 *     tags:
 *     - "Game"
 *     summary: "Add image to post"
 *     description: ""
 *     operationId: ""
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Post ID
 *       required: true
 *       type: integer 
 *     requestBody:
 *      required: true
 *      content:
 *          multipart/form-data:
 *              schema:
 *                  type: object
 *                  properties:
 *                      file:
 *                          type: string
 *                          format: binary
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
router.put('/insertImage/:id', ensureAuthenticated, Post.insertImage);
//#region doc
/**
 * @swagger
 *  /post/removeImage:
 *   delete:
 *     tags:
 *     - "Post"
 *     summary: "Remove image from post"
 *     description: ""
 *     operationId: ""
 *     parameters:
 *     - name: postID
 *       in: path
 *       description: Post ID
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
router.put('/removeImage/:id', ensureAuthenticated, Post.removeImage);
//#region doc
/**
 * @swagger
 *  /post/delete/{id}:
 *   delete:
 *     tags:
 *     - "Post"
 *     summary: "Delete post"
 *     description: ""
 *     operationId: "delete"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Post ID
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
router.delete('/delete/:id', ensureAuthenticated, hasPermission('post', 'delete'), Post.deletePost);

module.exports = router