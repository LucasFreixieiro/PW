const express = require('express');
const passport = require('passport');
const Profile = require('../controllers/profile.js');
const {forwardAuthenticated, ensureAuthenticated} = require('../middleware/auth');

const router = express.Router();
//#region doc
/**
 * @swagger
 *  /profile/{id}:
 *   get:
 *     tags:
 *     - "Profile"
 *     summary: "Return profile"
 *     description: "Return profile with user information like nickname, posts and games played"
 *     operationId: ""
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
 *              id:
 *                  type: integer
 *                  description: User ID
 *              nickname:
 *                  type: string
 *                  description: User nickname
 *              avatar:
 *                  type: string
 *                  description: User profile picture
 *              posts:
 *                  type: array
 *                  items:
 *                      id:
 *                          type: integer
 *                          description: Post ID
 *                      title:
 *                          type: string
 *                          description: Post title
 *                      created_at:
 *                          type: string
 *                          description: Post creation time
 *                      updated_at:
 *                          type: string
 *                          description: Post updated time
 *                      total_comments:
 *                          type: integer
 *                          description: Post total comments
 *              games:
 *                  type: array
 *                  items:
 *                      id:
 *                          type: integer
 *                          description: Game ID
 *                      title:
 *                          type: string
 *                          description: Game title
 *                      description:
 *                          type: string
 *                          description: Game description
 *                      images:
 *                          type: array
 *                          items: 
 *                              type: string
 */
//#endregion 
router.get('/:id', ensureAuthenticated, Profile.findProfileByID);

module.exports = router