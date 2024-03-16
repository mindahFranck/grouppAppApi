import { Request, Response } from "express";
import { createVulnerabilite, deleteVulnerabiliteid, getVulnerabilitebyId, getallVulnerabilite, updatedVulnerabilite } from "../service/vulnerabilite.service";



export async function AddVulnerabilite(
  req: Request,
  res: Response
) {
  try {
    const data = await createVulnerabilite(req.body);
    return res.status(200).json(data);
  } catch (e: any) {
    ;
    return res.status(409).send(e.message);
  }
};

export async function updateVulnerabilite(
  req: Request,
  res: Response
) {

  updatedVulnerabilite(req.params.id, req.body)
    .then(function (Vulnerabilite) {
      return res.status(201).json(Vulnerabilite)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de mettre a jour la Vulnerabilite",err })
    })


}
export async function deleteVulnerabilite(
  req: Request,
  res: Response
) {
  deleteVulnerabiliteid(req.params.id)

    .then(function (delVulnerabilite) {
      return res.status(201).json(delVulnerabilite)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de supprimer la Vulnerabilite" })
    })

}
export async function getAllVulnerabilite(
  req: Request,
  res: Response
) {
  getallVulnerabilite()
    .then(function (allVulnerabilite) {
      return res.status(201).json(allVulnerabilite)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de retouner la liste des Vulnerabilite", err })
    })
}
export async function getVulnerabiliteById(
  req: Request,
  res: Response
) {

  getVulnerabilitebyId(parseInt(req.params.id))
    .then(function (Vulnerabilite) {
      return res.status(201).json(Vulnerabilite)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de retouner la liste des Vulnerabilite" })
    })


}





