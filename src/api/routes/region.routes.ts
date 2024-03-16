import { Express } from "express";
import multer from 'multer';
import { getAllRegions, getRegionsById, updateRegions, AddRegions, importRegions, deleteRegions } from "../controller/region.controller";
const authentificationMiddleware = require("../middleware/authVerification");

const upload = multer();
function regions(app: Express) {

    /**
     * @swagger
     * '/api/regions':
     *  get:
     *     tags:
     *      - regions
     *     descriptions: Get all regions
     *     responses:
     *         200:
     *             description: all regions
     */
    app.get('/api/regions', getAllRegions)


    /**
    * @swagger
    * '/api/regions/{id}':
    *  get:
    *     tags:
    *      - regions
    *     descriptions: Get regions by Id
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: ID Obligatoire
    *         schema:
    *          type: string
    *     responses:
    *         200:
    *             description: Get regions by Id
    */
    app.get('/api/regions/:id', getRegionsById)

    /**
      * @swagger
      * '/api/regions/{id}':
      *  put:
      *     tags:
      *     - regions
      *     summary: Update  regions
      *     description: Update regions
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
      *              $ref: '#/components/schemas/CreateregionsInput'
      *     responses:
      *      200:
      *        description: Success
      *        content:
      *          application/json:
      *            schema:
      *              $ref: '#/components/schemas/CreateregionsResponse'
      *      409:
      *        description: Conflict
      *      400:
      *        description: Bad request
      */
    app.put('/api/regions/:id', updateRegions)
    /**
* @swagger
* '/api/regions':
*  post:
*     tags:
*     - regions
*     summary: Register regions
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*              $ref: '#/components/schemas/CreateregionsInput'
*     responses:
*      200:
*        description: Success
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/CreateregionsResponse'
*      409:
*        description: Conflict
*      400:
*        description: Bad request
*/
    app.post('/api/regions', AddRegions)




/**
 * @swagger
 * /api/upload/regions:
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
app.post('/api/upload/regions',upload.single('file'), importRegions)
    /**
     * @swagger
     * '/api/regions/{id}':
     *  delete:
     *     tags:
     *      - regions
     *     descriptions: Delete regions
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID Obligatoire
     *         schema:
     *         type: string
     *     responses:
     *         200:
     *             description: Delete regions
     */
    app.delete('/api/regions/:id', deleteRegions)

}
export default regions;