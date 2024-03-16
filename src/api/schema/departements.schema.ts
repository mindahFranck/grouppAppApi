import { number, object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreatedepartementsInput:
 *      type: object
 *      required:
 *        - departement
 *        - region_id
 *      properties:
 *        departement:
 *          type: string
 *          default: code
 *        region_id:
 *          type: integer
 *          default: 1
 *    CreatedepartementsResponse:
 *      type: object
 *      properties:
 *        departement:
 *          type: string
 *        region_id:
 *          type: integer
 *        id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export const CreatedepartementsSchema = object({
  body: object({
    departement: string({
      required_error: "le departement est obligatoire",
    }),
    region_id: string({
        required_error: "l'id de la region est obligatoire",
      }),
  })

});

