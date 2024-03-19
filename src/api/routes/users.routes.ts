import { Express } from "express";
import { Adduser,getUser, updateUser,deleteUser, getUserId,Login } from "../controller/user.controller";
import validateResource from '../middleware/validateResource'
import { createUserSchema, loginUserSchema } from "../schema/user.schema";
const authentificationMiddleware = require("../middleware/authVerification");
const checkRole = require("../middleware/roleVerifications");

function users(app: Express){
  
 /**
  * @swagger
  * '/api/users':
  *  get:
  *     tags:
  *      - User
  *     descriptions: Get all users
  *     responses:
  *         200:
  *             description: all users
  */
 app.get('/api/users', authentificationMiddleware,checkRole(['administrateur']),getUser)

 



  /**
  * @swagger
  * '/api/users/{id}':
  *  get:
  *     tags:
  *      - User
  *     descriptions: Get user by Id
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         description: ID Obligatoire
  *         schema:
  *          type: integer
  *     responses:
  *         200:
  *             description: Get user by Id
  */
  app.get('/api/users/:id',authentificationMiddleware,checkRole(['administrateur']), getUserId)
     /**
   * @swagger
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
 app.post('/api/users', authentificationMiddleware, validateResource(createUserSchema), Adduser)
      /**
   * @swagger
   * '/api/login/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Login  user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/LoginUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/LoginUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
      app.post('/api/login/users',authentificationMiddleware, validateResource(loginUserSchema), Login)
     /**
   * @swagger
   * '/api/users/{id}':
   *  put:
   *     tags:
   *     - User
   *     summary: Update  user
   *     description: Update user
   *     parameters:
   *          - in: path
   *            name: id
   *            required: true
   *            description: ID Obligatoire
   *            schema:
   *             type: integer
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.put('/api/users/:id',authentificationMiddleware,checkRole(['administrateur']), updateUser)
 /**
  * @swagger
  * '/api/users/{id}':
  *  delete:
  *     tags:
  *      - User
  *     descriptions: Delete users
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         description: ID Obligatoire
  *         schema:
  *         type: integer
  *     responses:
  *         200:
  *             description: Delete users
  */
 app.delete('/api/users/:id',authentificationMiddleware,checkRole(['administrateur']), deleteUser)

}
export default users;