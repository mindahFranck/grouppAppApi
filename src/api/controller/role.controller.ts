import { Request, Response } from "express";
import { createRole, deletRoleid, getRolebyId, getallRole, updatedRole } from "../service/role.service";


export async function AddRole(
  req: Request,
  res: Response
) {
  try {
    const data = await createRole(req.body);
    return res.status(200).json(data);
  } catch (e: any) {
    ;
    return res.status(409).send(e.message);
  }
};

export async function updateRole(
  req: Request,
  res: Response
) {

  updatedRole(req.params.id, req.body)
    .then(function (Role) {
      return res.status(201).json(Role)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de mettre a jour le Role",err })
    })


}
export async function deleteRole(
  req: Request,
  res: Response
) {
  deletRoleid(req.params.id)

    .then(function (delRole) {
      return res.status(201).json(delRole)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de supprimer le Role" })
    })

}
export async function getAllRole(
  req: Request,
  res: Response
) {
  getallRole()
    .then(function (allRole) {
      return res.status(201).json(allRole)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de retouner la liste des Roles", err })
    })
}
export async function getRoleById(
  req: Request,
  res: Response
) {

  getRolebyId(parseInt(req.params.id))
    .then(function (Role) {
      return res.status(201).json(Role)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de retouner la liste des Roles" })
    })


}





