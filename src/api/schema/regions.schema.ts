import { number, object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateregionsInput:
 *      type: object
 *      required:
 *        - region
 *      properties:
 *        region:
 *          type: string
 *          default: code
 *    CreateregionsResponse:
 *      type: object
 *      properties:
 *        region:
 *          type: string
 *        id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export const CreateregionSchema = object({
  body: object({
    region: string({
      required_error: "la region est obligatoire",
    })
  })

});

