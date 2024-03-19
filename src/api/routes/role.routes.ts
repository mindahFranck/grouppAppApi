import { Express } from "express";
import { AddRole, deleteRole, getAllRole, getRoleById, updateRole } from "../controller/role.controller";
const authentificationMiddleware = require("../middleware/authVerification");
const checkRole = require("../middleware/roleVerifications");

function role(app: Express) {

    /**
     * @swagger
     * '/api/role':
     *  get:
     *     tags:
     *      - role
     *     descriptions: Get all role
     *     responses:
     *         200:
     *             description: all role
     */
    app.get('/api/role',authentificationMiddleware,checkRole(['administrateur']), getAllRole)

    /**
    * @swagger
    * '/api/role/{id}':
    *  get:
    *     tags:
    *      - role
    *     descriptions: Get role by Id
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: ID Obligatoire
    *         schema:
    *          type: string
    *     responses:
    *         200:
    *             description: Get role by Id
    */
    app.get('/api/role/:id',authentificationMiddleware,checkRole(['administrateur']), getRoleById)

    /**
      * @swagger
      * '/api/role/{id}':
      *  put:
      *     tags:
      *     - role
      *     summary: Update  role
      *     description: Update role
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
      *              $ref: '#/components/schemas/CreatRoleInput'
      *     responses:
      *      200:
      *        description: Success
      *        content:
      *          application/json:
      *            schema:
      *              $ref: '#/components/schemas/CreatRoleResponse'
      *      409:
      *        description: Conflict
      *      400:
      *        description: Bad request
      */
    app.put('/api/role/:id',authentificationMiddleware,checkRole(['administrateur']), updateRole)
    /**
* @swagger
* '/api/role':
*  post:
*     tags:
*     - role
*     summary: Register role
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*              $ref: '#/components/schemas/CreatRoleInput'
*     responses:
*      200:
*        description: Success
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/CreatRoleResponse'
*      409:
*        description: Conflict
*      400:
*        description: Bad request
*/
    app.post('/api/role',authentificationMiddleware,checkRole(['administrateur']), AddRole)
    /**
     * @swagger
     * '/api/role/{id}':
     *  delete:
     *     tags:
     *      - role
     *     descriptions: Delete role
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID Obligatoire
     *         schema:
     *         type: string
     *     responses:
     *         200:
     *             description: Delete role
     */
    app.delete('/api/role/:id',authentificationMiddleware,checkRole(['administrateur']), deleteRole)

}
export default role;