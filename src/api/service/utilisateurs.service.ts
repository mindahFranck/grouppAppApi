const { Sequelize } = require('sequelize');
import { Request, Response } from "express";
import { omit } from "lodash";
import { loginInterface, UserInterface } from "../interface/user.interface";
import UtilisateursModel from "../models/utilisateurs.model";
import RolesModel from "../models/roles.models";

export async function createuser(value:UserInterface) {
        console.log(value);
        var newUser = UtilisateursModel.create(
          value
        );
  
      return newUser
      
  
}
export async function loginuser(value:loginInterface) {
    const finduser= UtilisateursModel.findOne({
    where: {username: value.username},
    include:[{
        model: RolesModel
    }]
})
    return finduser;
}
export async function finduse(value:any) {
 const val = await UtilisateursModel.findOne({
        where: { username: value}
      })
      return val
}
export async function getallusers() {

        const user = await RolesModel.findAll({
            attributes: ["libelle"],
            include:[{
                model: UtilisateursModel,
                attributes: ["id","username","raisonSociale","nom","prenoms"]
            }]
        }); 
        return user;

     
}
export async function deleteUserid(id:number) {
  
        const user = await UtilisateursModel.destroy({
            where:{
                id:id
            }
        });
        return id;

}
export async function getbyId(id:number) {
 
        const user = await UtilisateursModel.findByPk(id);
        return user;

   
}
export async function updated(id:number, value:UserInterface) {
   const data = await UtilisateursModel.update(value,{
        where:{
            id: id
        }
    });
    return data;
}