import { Request, Response } from "express";
import { createRegions, deleteRegionsid, getRegionsbyId, getallRegions, importsRegions, updatedRegions } from "../service/region.service";


export async function AddRegions(
  req: Request,
  res: Response
) {
  try {
    const data = await createRegions(req.body);
    return res.status(200).json(data);
  } catch (e: any) {
    return res.status(409).send(e.message);
  }
};

export async function updateRegions(
  req: Request,
  res: Response
) {

  updatedRegions(parseInt(req.params.id), req.body)
    .then(function (Regions) {
      return res.status(201).json(Regions)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de mettre a jour la Region",err })
    })


}
export async function deleteRegions(
  req: Request,
  res: Response
) {
  deleteRegionsid(parseInt(req.params.id))

    .then(function (delRegions) {
      return res.status(201).json(delRegions)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de supprimer la Region" })
    })

}
export async function getAllRegions(
  req: Request,
  res: Response
) {
  getallRegions()
    .then(function (allRegions) {
      return res.status(201).json(allRegions)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de retouner la liste des Regions", err })
    })
}
export async function getRegionsById(
  req: Request,
  res: Response
) {

  getRegionsbyId(parseInt(req.params.id))
    .then(function (Regions) {
      return res.status(201).json(Regions)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de retouner la liste des Regions" })
    })


}


export async function importRegions(
  req: Request,
  res: Response
) {

  importsRegions(req.file)
    .then(function (Regions) {
      return res.status(201).json(Regions)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de mettre a jour la Region",err })
    })


}


