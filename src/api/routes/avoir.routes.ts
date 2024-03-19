import { Express } from "express";
import { AddAvoir, deleteAvoir, getAllAvoir, getAllState, updateAvoir } from "../controller/avoirvulnerabilite.controller";
const authentificationMiddleware = require("../middleware/authVerification");
const checkRole = require("../middleware/roleVerifications");

function avoir(app: Express) {

    /**
     * @swagger
     * '/api/avoir':
     *  get:
     *     tags:
     *      - avoir
     *     descriptions: Get all avoir
     *     responses:
     *         200:
     *             description: all avoir
     */
    app.get('/api/avoir',authentificationMiddleware, getAllAvoir)

    
    /**
     * @swagger
     * '/api/state':
     *  get:
     *     descriptions: Get statistique
     *     responses:
     *         200:
     *             description: Get statistique
     */
    app.get('/api/state',authentificationMiddleware, getAllState)

    /**
      * @swagger
      * '/api/avoir/{id}':
      *  put:
      *     tags:
      *     - avoir
      *     summary: Update  avoir
      *     description: Update avoir
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
      *              $ref: '#/components/schemas/CreateAgentInput'
      *     responses:
      *      200:
      *        description: Success
      *        content:
      *          application/json:
      *            schema:
      *              $ref: '#/components/schemas/CreateAgentResponse'
      *      409:
      *        description: Conflict
      *      400:
      *        description: Bad request
      */
    app.put('/api/avoir/:id',authentificationMiddleware, updateAvoir)
    /**
* @swagger
* '/api/avoir':
*  post:
*     tags:
*     - avoir
*     summary: Register avoir
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*              $ref: '#/components/schemas/CreateAgentInput'
*     responses:
*      200:
*        description: Success
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/CreateAgentResponse'
*      409:
*        description: Conflict
*      400:
*        description: Bad request
*/
    app.post('/api/avoir',authentificationMiddleware, AddAvoir)
    /**
     * @swagger
     * '/api/avoir/{id}':
     *  delete:
     *     tags:
     *      - avoir
     *     descriptions: Delete avoir
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID Obligatoire
     *         schema:
     *         type: string
     *     responses:
     *         200:
     *             description: Delete avoir
     */
    app.delete('/api/avoir/:id',authentificationMiddleware, deleteAvoir)

}
export default avoir;