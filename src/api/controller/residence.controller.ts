import { Request, Response } from "express";
import { createResidence, deleteResidenceid, getResidencebyId, getallResidence, updatedResidence } from "../service/residence.service";


export async function AddResidence(
  req: Request,
  res: Response
) {
  try {
    const data = await createResidence(req.body);
    return res.status(200).json(data);
  } catch (e: any) {
    ;
    return res.status(409).send(e.message);
  }
};

export async function updateResidence(
  req: Request,
  res: Response
) {

  updatedResidence(req.params.id, req.body)
    .then(function (Residence) {
      return res.status(201).json(Residence)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de mettre a jour la Residence",err })
    })


}
export async function deleteResidence(
  req: Request,
  res: Response
) {
  deleteResidenceid(req.params.id)

    .then(function (delResidence) {
      return res.status(201).json(delResidence)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de supprimer la Residence" })
    })

}
export async function getAllResidence(
  req: Request,
  res: Response
) {
  getallResidence()
    .then(function (allResidence) {
      return res.status(201).json(allResidence)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de retouner la liste des Residences", err })
    })
}
export async function getResidenceById(
  req: Request,
  res: Response
) {

  getResidencebyId(parseInt(req.params.id))
    .then(function (Residence) {
      return res.status(201).json(Residence)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de retouner la liste des Residences" })
    })


}





