import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"
import {version} from "../../../package.json"

const options: swaggerJsdoc.Options = {
    definition:{
        openapi: "3.0.0",
        info: {
            title: "REST API Docs",
            version
        },
        components:{
            securitySchemas:{
                bearerAuth:{
                    type:"htpp",
                    scheme:"bearer",
                    bearerFormat: "JWT"
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            }
        ]
    },
    apis: ["./src/api/routes/*.ts","./src/api/schema/*.ts"]
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app: Express){
    //Swagger page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    //Docs in Json format
    app.get("docs.json", (req: Request, res: Response)=>{
        res.setHeader('Content-Type', "application/json");
        res.send(swaggerSpec);
    });
}

export default swaggerDocs;