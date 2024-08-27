const express = require('express');
const Permission = require('../controllers/permission.js');
const { ensureAuthenticated, hasPermission } = require('../middleware/auth.js');

const router = express.Router();

//#region doc
/**
 * @swagger
 *  /permission/all:
 *   get:
 *     tags:
 *     - "Permission"
 *     summary: "Return all permissions"
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
 *                  permissionID:
 *                      type: integer
 *                      description: Permission ID
 *                  controller:
 *                      type: string
 *                      description: Controller
 *                  action:
 *                      type: string
 *                      description: Action to be made
 *                  description:
 *                      type: string
 *                      description: Permission description
 */
//#endregion
router.get('/all', ensureAuthenticated, hasPermission('role', 'read'), Permission.findAll);
//#region doc
/**
 * @swagger
 *  /permission/findByID/{id}:
 *   get:
 *     tags:
 *     - "Permission"
 *     summary: "Return permission"
 *     description: "Return permission with specific ID"
 *     operationId: "findByID"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Permission ID
 *       required: true
 *       type: integer 
 *     responses:
 *       "200":
 *         description: "Successful operation"
 *         schema:
 *           type: object
 *           properties:
 *                  permissionID:
 *                      type: integer
 *                      description: Permission ID
 *                  controller:
 *                      type: string
 *                      description: Controller
 *                  action:
 *                      type: string
 *                      description: Action to be made
 *                  description:
 *                      type: string
 *                      description: Permission description
 */
//#endregion
router.get('/findByID/:id', ensureAuthenticated, hasPermission('role', 'read'), Permission.findByID);

module.exports = router;