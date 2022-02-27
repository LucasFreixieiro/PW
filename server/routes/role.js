const express = require('express');
const Role = require('../controllers/role.js');
const { ensureAuthenticated, hasPermission } = require('../middleware/auth.js');

const router = express.Router();
//#region doc
/**
 * @swagger
 *  /role/:
 *   get:
 *     tags:
 *     - "Role"
 *     summary: "Return all roles"
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
 *                      description: Role ID
 *                  description:
 *                      type: string
 *                      description: Role description
 */
//#endregion
router.get('/', Role.findAllRoles);
//#region doc
/**
 * @swagger
 *  /role/create:
 *   post:
 *     tags:
 *     - "Role"
 *     summary: "Create role"
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
router.post('/create', ensureAuthenticated, hasPermission('role', 'create'), Role.createRole);
//#region doc
/**
 * @swagger
 *  /role/update:
 *   put:
 *     tags:
 *     - "Role"
 *     summary: "Update role"
 *     description: ""
 *     operationId: ""
 *     requestBody:
 *      required: true
 *      content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: integer
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
router.put('/update', ensureAuthenticated, hasPermission('role', 'edit'), Role.update);
//#region doc
/**
 * @swagger
 *  /role/delete/{id}:
 *   delete:
 *     tags:
 *     - "Role"
 *     summary: "Delete role"
 *     description: ""
 *     operationId: "delete"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Role ID
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
router.delete('/delete/:id', ensureAuthenticated, hasPermission('role', 'delete'), Role.deleteRole);

module.exports = router