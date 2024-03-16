import { Request, Response } from "express";
import { createDepartements, updatedDepartements, deleteDepartementsid, getallDepartements, getDepartementsbyId, importsDepartements } from "../service/departement.service";


export async function AddDepartements(
  req: Request,
  res: Response
) {
  try {
    const data = await createDepartements(req.body);
    return res.status(200).json(data);
  } catch (e: any) {
    return res.status(409).send(e.message);
  }
};

export async function updateDepartements(
  req: Request,
  res: Response
) {

  updatedDepartements(parseInt(req.params.id), req.body)
    .then(function (Departements) {
      return res.status(201).json(Departements)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de mettre a jour le departements",err })
    })


}
export async function deleteDepartements(
  req: Request,
  res: Response
) {
  deleteDepartementsid(parseInt(req.params.id))

    .then(function (delDepartements) {
      return res.status(201).json(delDepartements)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de supprimer le departements" })
    })

}
export async function getAllDepartements(
  req: Request,
  res: Response
) {
  getallDepartements()
    .then(function (allDepartements) {
      return res.status(201).json(allDepartements)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de retouner la liste des Departements", err })
    })
}
export async function getDepartementsById(
  req: Request,
  res: Response
) {

  getDepartementsbyId(parseInt(req.params.id))
    .then(function (Departements) {
      return res.status(201).json(Departements)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de retouner la liste des Departements" })
    })


}


export async function importDepartements(
  req: Request,
  res: Response
) {

  importsDepartements(req.file)
    .then(function (Departements) {
      return res.status(201).json(Departements)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de mettre a jour le departements",err })
    })


}


