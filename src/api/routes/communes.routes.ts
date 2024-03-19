import { Express } from "express";
import { getAllCommunes, getCommunesById, updateCommunes, AddCommunes, deleteCommunes, importCommunes } from "../controller/communes.controller";
import multer from 'multer';
const authentificationMiddleware = require("../middleware/authVerification");
const checkRole = require("../middleware/roleVerifications");

const upload = multer();
function communes(app: Express) {

    /**
     * @swagger
     * '/api/communes':
     *  get:
     *     tags:
     *      - communes
     *     descriptions: Get all communes
     *     responses:
     *         200:
     *             description: all communes
     */
    app.get('/api/communes',authentificationMiddleware,checkRole(['administrateur', 'organisation', 'agents','ong']), getAllCommunes)


    /**
    * @swagger
    * '/api/communes/{id}':
    *  get:
    *     tags:
    *      - communes
    *     descriptions: Get communes by Id
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: ID Obligatoire
    *         schema:
    *          type: string
    *     responses:
    *         200:
    *             description: Get communes by Id
    */
    app.get('/api/communes/:id',authentificationMiddleware,checkRole(['administrateur', 'organisation', 'agents','ong']), getCommunesById)

    /**
      * @swagger
      * '/api/communes/{id}':
      *  put:
      *     tags:
      *     - communes
      *     summary: Update  communes
      *     description: Update communes
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
      *              $ref: '#/components/schemas/CreateCommunesInput'
      *     responses:
      *      200:
      *        description: Success
      *        content:
      *          application/json:
      *            schema:
      *              $ref: '#/components/schemas/CreateCommunesResponse'
      *      409:
      *        description: Conflict
      *      400:
      *        description: Bad request
      */
    app.put('/api/communes/:id',authentificationMiddleware,checkRole(['administrateur', 'organisation', 'agents','ong']), updateCommunes)
    /**
* @swagger
* '/api/communes':
*  post:
*     tags:
*     - communes
*     summary: Register communes
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*              $ref: '#/components/schemas/CreateCommunesInput'
*     responses:
*      200:
*        description: Success
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/CreateCommunesResponse'
*      409:
*        description: Conflict
*      400:
*        description: Bad request
*/
    app.post('/api/communes',authentificationMiddleware,checkRole(['administrateur', 'organisation', 'agents','ong']), AddCommunes)




/**
 * @swagger
 * /api/upload/communes:
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
app.post('/api/upload/communes',upload.single('file'), importCommunes)
    /**
     * @swagger
     * '/api/communes/{id}':
     *  delete:
     *     tags:
     *      - communes
     *     descriptions: Delete communes
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID Obligatoire
     *         schema:
     *         type: string
     *     responses:
     *         200:
     *             description: Delete communes
     */
    app.delete('/api/communes/:id',authentificationMiddleware,checkRole(['administrateur', 'organisation', 'agents','ong']), deleteCommunes)

}
export default communes;