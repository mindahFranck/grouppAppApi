import { Request, Response } from "express";
import { omit } from "lodash";
import { createuser, getallusers,deleteUserid,getbyId,updated, loginuser, finduse } from "../service/utilisateurs.service";
const { Sequelize } = require('sequelize');
import bcrypt from "bcrypt";
var util = require('../utils/jwt.utils')

export async function Adduser(
    req: Request,
    res: Response
){
    
      var username = req.body.username;
      var nom = req.body.nom;
      var prenoms = req.body.prenoms;
      var raisonSociale = req.body.raisonSociale;
      var password = req.body.password;
      var idrole = req.body.idrole;
      if(username == null || password == null || idrole == null){
        return res.status(400).json({'error':'parametre manquants'})
    }
    finduse(username)
    .then(function(userFound){
      if(!userFound){
        bcrypt.hash(password, 5, function(err:any, bcryptedPassword:any){
          var value = {
            "password":bcryptedPassword,
            "username":username,
            "idrole": idrole,
            "nom":nom,
            "prenoms":prenoms,
            "raisonSociale": raisonSociale,
          };
          createuser(value)
          .then(function(newUser:any){
            return res.status(201).json({
              'userId': newUser.id
            })
          })
          .catch(function(err){
            return res.status(500).json({'error':"impossible d'ajouter l'utilisateur",err})
          })
        })
      }else{
        return res.status(409).json({'error':"l'utilisateur existe"})
      }
      
    })
    .catch(function(err){
      return res.status(500).json({'error':"impossible de vérifier l'utilisateur"})
    })
 
  


 

};
export async function Login(
    req: Request,
    res: Response
) {
  var username = req.body.username;
var password = req.body.password;

if(username == null || password == null){
  return res.status(400).json({'error':'parametre manquants'})
}
loginuser(req.body).then(function(finduser:any){
  if (finduser!=null){
    bcrypt.compare(password, finduser.password, function(errBycrypt, resBycrypt){
       if(resBycrypt){
           return res.status(201).json({'userId':finduser.id, 'token':util.generateTokenUser(finduser)}) 
       }else{
        return res.status(500).json({'error':"password Invalid"})
       }
    })

}else{
  return res.status(500).json({'error':"l'utilisateur n'existe pas dans la BD"})}
})
  
}
export async function updateUser(   
    req: Request,
    res: Response
){
  
        updated(parseInt(req.params.id),req.body)
        .then(function(allUser){
          return res.status(201).json(allUser)
        })
        .catch(function(err){
          return res.status(500).json({'error':"impossible de mettre a jpur l'utilisateurs"})
        })
       
   
}
export async function deleteUser(   
    req: Request,
    res: Response
){
    deleteUserid(parseInt(req.params.id))
    .then(function(deluser){
      return res.status(201).json(deluser)
    })
    .catch(function(err){
      return res.status(500).json({'error':"impossible de supprimer l'utilisateurs"})
    })  

}
export async function getUser(   
    req: Request,
    res: Response
){
     getallusers()
        .then(function(alluser){
          return res.status(201).json(alluser)
        })
        .catch(function(err){
          return res.status(500).json({'error':"impossible de retouner la liste des utilisateurs"})
        }) 
}
export async function getUserId(   
    req: Request,
    res: Response
){
  
       getbyId(parseInt(req.params.id))
       .then(function(userId){
        return res.status(201).json(userId)
      })
      .catch(function(err){
        return res.status(500).json({'error':"impossible de retouner la liste des utilisateurs"})
      })  
      

}
