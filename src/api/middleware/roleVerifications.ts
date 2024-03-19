import { Request, Response, NextFunction } from "express";
import RolesModel from "../models/roles.models";

// Middleware de vérification du rôle
const jwt= require("jsonwebtoken");
var SECRET_Key = "sji49D9SU8FD09QN9fddn84S9N39D8S989Q9#eJF9Sddkszkxooos";

const checkRole = (roleName: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Obtenez le rôle de l'utilisateur depuis l'authentification (par exemple, le jeton JWT)
      const token:any = req.headers.authorization; // C'est un exemple, adaptez-le à votre application
       var  userRole: any;
       //decode le token et recupere le role
       const valuetoken = token.split(" ")[1];
       const decodedtoken = jwt.verify(valuetoken, SECRET_Key, (error:any, decodedtoken:any) => {
         userRole = decodedtoken.role;
       })
      // Recherchez le rôle dans la base de données
      const role = await RolesModel.findOne({ where: { libelle: userRole } });

    
      // Vérifiez si le rôle de l'utilisateur correspond au rôle requis
      if (!role || !roleName.includes(userRole)) {
        return res.status(403).json({ message: "Vous n'avez pas les autorisations requises." });
      }

      // Si le rôle de l'utilisateur correspond au rôle requis, passez à la route suivante
      next();
    } catch (error) {
      console.error('Erreur lors de la vérification du rôle:', error);
      return res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  };
};

module.exports = checkRole;
