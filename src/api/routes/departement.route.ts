import { Express } from "express";
import multer from 'multer';
import { getAllDepartements, getDepartementsById, updateDepartements, AddDepartements, importDepartements, deleteDepartements } from "../controller/departement.controller";
const authentificationMiddleware = require("../middleware/authVerification");
const checkRole = require("../middleware/roleVerifications");

const upload = multer();
function departements(app: Express) {

    /**
     * @swagger
     * '/api/departements':
     *  get:
     *     tags:
     *      - departements
     *     descriptions: Get all departements
     *     responses:
     *         200:
     *             description: all departements
     */
    app.get('/api/departements',authentificationMiddleware,checkRole(['administrateur', 'organisation', 'agents','ong']), getAllDepartements)


    /**
    * @swagger
    * '/api/departements/{id}':
    *  get:
    *     tags:
    *      - departements
    *     descriptions: Get departements by Id
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: ID Obligatoire
    *         schema:
    *          type: string
    *     responses:
    *         200:
    *             description: Get departements by Id
    */
    app.get('/api/departements/:id',authentificationMiddleware,checkRole(['administrateur', 'organisation', 'agents','ong']), getDepartementsById)

    /**
      * @swagger
      * '/api/departements/{id}':
      *  put:
      *     tags:
      *     - departements
      *     summary: Update  departements
      *     description: Update departements
      *     parameters:
      *          - in: path
      *            name: id
      *            required: true
      *            description: ID Obligatoire
      *            schema:
      *             type: string
      *     requestBody:
      *      required: true
      *      content:
      *        application/json:
      *           schema:
      *              $ref: '#/components/schemas/CreatedepartementsInput'
      *     responses:
      *      200:
      *        description: Success
      *        content:
      *          application/json:
      *            schema:
      *              $ref: '#/components/schemas/CreatedepartementsResponse'
      *      409:
      *        description: Conflict
      *      400:
      *        description: Bad request
      */
    app.put('/api/departements/:id',authentificationMiddleware,checkRole(['administrateur', 'organisation', 'agents','ong']), updateDepartements)
    /**
* @swagger
* '/api/departements':
*  post:
*     tags:
*     - departements
*     summary: Register departements
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*              $ref: '#/components/schemas/CreatedepartementsInput'
*     responses:
*      200:
*        description: Success
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/CreatedepartementsResponse'
*      409:
*        description: Conflict
*      400:
*        description: Bad request
*/
    app.post('/api/departements',authentificationMiddleware,checkRole(['administrateur', 'organisation', 'agents','ong']), AddDepartements)




/**
 * @swagger
 * /api/upload/departements:
 *   post:
 *     summary: Upload a file
 *     description: Endpoint for uploading a file.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: file
 *         in: formData
 *         description: The file to upload
 *         required: true
 *         type: file
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: File uploaded successfully
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: Bad request, check your file
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
app.post('/api/upload/departements',upload.single('file'), importDepartements)
    /**
     * @swagger
     * '/api/departements/{id}':
     *  delete:
     *     tags:
     *      - departements
     *     descriptions: Delete departements
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID Obligatoire
     *         schema:
     *         type: string
     *     responses:
     *         200:
     *             description: Delete departements
     */
    app.delete('/api/departements/:id',authentificationMiddleware,checkRole(['administrateur', 'organisation', 'agents','ong']), deleteDepartements)

}
export default departements;