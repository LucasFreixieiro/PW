const express = require('express');
const Award = require('../controllers/award.js');
var multer  = require('multer');
const { ensureAuthenticated, hasPermission } = require('../middleware/auth.js');

const router = express.Router();


// Defines storage where we go to upload banners
const storage = multer.diskStorage({
    destination: (req, dir, cb) => {
        cb(null, "static/awards")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() +  '' + file.originalname)
    }
});
const upload = multer({storage: storage});

router.get('/all', Award.findAll);
router.get('/findById/:id', Award.findByID);
//#region doc
/**
 * @swagger
 *  /award/create:
 *   post:
 *     tags:
 *     - "Award"
 *     summary: "Create award"
 *     description: ""
 *     operationId: ""
 *     requestBody:
 *      required: true
 *      content:
 *          multipart/form-data:
 *              schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                      description:
 *                          type: string
 *                      url:
 *                          type: string
 *                          format: binary
 *     responses:
 *       "200":
 *         description: "Successful operation"
 *       "400":
 *         description: "Fields missing"
 *       "403":
 *         description: "Don't have permissions"
 */
//#endregion
router.post('/create', ensureAuthenticated, hasPermission('award', 'create'), upload.single('file'), Award.create);
//#region doc
/**
 * @swagger
 *  /award/delete/{id}:
 *   delete:
 *     tags:
 *     - "Award"
 *     summary: "Delete award"
 *     description: ""
 *     operationId: "delete"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Award ID
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
router.delete('/delete/:id', ensureAuthenticated, hasPermission('award', 'delete'), Award.delete);

module.exports = router;