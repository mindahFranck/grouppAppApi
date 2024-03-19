import { Express } from "express";
import { AddResidence, deleteResidence, getAllResidence, getResidenceById, updateResidence } from "../controller/residence.controller";
const authentificationMiddleware = require("../middleware/authVerification");
const checkRole = require("../middleware/roleVerifications");

function residence(app: Express) {

    /**
     * @swagger
     * '/api/residence':
     *  get:
     *     tags:
     *      - residence
     *     descriptions: Get all residence
     *     responses:
     *         200:
     *             description: all residence
     */
    app.get('/api/residence',authentificationMiddleware,checkRole(['administrateur', 'organisation', 'agents','ong']), getAllResidence)

    /**
    * @swagger
    * '/api/residence/{id}':
    *  get:
    *     tags:
    *      - residence
    *     descriptions: Get residence by Id
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: ID Obligatoire
    *         schema:
    *          type: string
    *     responses:
    *         200:
    *             description: Get residence by Id
    */
    app.get('/api/residence/:id',authentificationMiddleware,checkRole(['administrateur', 'organisation', 'agents','ong']), getResidenceById)

    /**
      * @swagger
      * '/api/residence/{id}':
      *  put:
      *     tags:
      *     - residence
      *     summary: Update  residence
      *     description: Update residence
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
      *              $ref: '#/components/schemas/CreateResidenceInput'
      *     responses:
      *      200:
      *        description: Success
      *        content:
      *          application/json:
      *            schema:
      *              $ref: '#/components/schemas/CreateResidenceResponse'
      *      409:
      *        description: Conflict
      *      400:
      *        description: Bad request
      */
    app.put('/api/residence/:id',authentificationMiddleware,checkRole(['administrateur', 'organisation', 'agents','ong']), updateResidence)
    /**
* @swagger
* '/api/residence':
*  post:
*     tags:
*     - residence
*     summary: Register residence
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*              $ref: '#/components/schemas/CreateResidenceInput'
*     responses:
*      200:
*        description: Success
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/CreateResidenceResponse'
*      409:
*        description: Conflict
*      400:
*        description: Bad request
*/
    app.post('/api/residence',authentificationMiddleware,checkRole(['administrateur', 'organisation', 'agents','ong']), AddResidence)
    /**
     * @swagger
     * '/api/residence/{id}':
     *  delete:
     *     tags:
     *      - residence
     *     descriptions: Delete residence
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID Obligatoire
     *         schema:
     *         type: string
     *     responses:
     *         200:
     *             description: Delete residence
     */
    app.delete('/api/residence/:id',authentificationMiddleware,checkRole(['administrateur', 'organisation', 'agents','ong']), deleteResidence)

}
export default residence;