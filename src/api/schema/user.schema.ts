import { object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: Jane Doe
 *        idrole:
 *          type: integer
 *          default: 1
 *        password:
 *          type: string
 *          default: stringPassword123
 *    CreateUserInputFilter:
 *      type: object
 *      required:
 *        - regionId
 *        - departementId 
 *        - communeId
 *        - quartierId
 *      properties:
 *        regionId:
 *          type: integer
 *        departementId:
 *          type: integer
 *        communeId:
 *          type: integer
 *        quartierId:
 *          type: integer
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        id:
 *          type: integer
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export const createUserSchema = object({
  body: object({
    username: string({
      required_error: "username is required",
    }),
    password: string({
      required_error: "password is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
  })

});

/**
 * @openapi
 * components:
 *  schemas:
 *    LoginUserInput:
 *      type: object
 *      required:
 *        - name
 *        - password
 *      properties:
 *        name:
 *          type: string
 *          default: username
 *        password:
 *          type: string
 *          default: stringPassword123
 *    LoginUserResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        token:
 *          type: string
 */
export const loginUserSchema = object({
  body: object({
    password: string({
      required_error: "le mots de passe est obligatoire",
    }).min(6, "Password too short - should be 6 chars minimum"),
    username: string({
      required_error: "le noms est obligatoire",
    })
  })

});