import { number, object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateCommunesInput:
 *      type: object
 *      required:
 *        - commune
 *        - departement_id
 *      properties:
 *        commune:
 *          type: string
 *          default: code
 *        departement_id:
 *          type: integer
 *          default: 1
 *    CreateCommunesResponse:
 *      type: object
 *      properties:
 *        commune:
 *          type: string
 *        departement_id:
 *          type: integer
 *        id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export const CreateCommuneSchema = object({
  body: object({
    commune: string({
      required_error: "la commune est obligatoire",
    }),
    departement_id: string({
        required_error: "l'id du departement est obligatoire",
      }),
  })

});

