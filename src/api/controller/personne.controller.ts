import { Request, Response } from "express";
import { createPersonne, deletePersonneid, getPersonnebyId, getallPersonne, getallPersonneChefDeFamille, updatedPersonne } from "../service/personne.service";
import { createAvoir } from "../service/avoir.service";


export async function AddPersonne(
  req: Request,
  res: Response
) {
  try {
    const data:any = await createPersonne(req.body);
    const vulnerabilite = req.body.vulnerabilite;
    if(vulnerabilite.length > 0 && data){
      for(let vulnerable of vulnerabilite){
        let value = {"idvulnerabilite":parseInt(vulnerable), "idPer": parseInt(data.id)}
        await createAvoir(value);
      }
    }
    return res.status(200).json(data);
  } catch (e: any) {
    ;
    return res.status(409).send(e.message);
  }
};

export async function updatePersonne(
  req: Request,
  res: Response
) {

  updatedPersonne(req.params.id, req.body)
    .then(function (Personne) {
      return res.status(201).json(Personne)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de mettre a jour la Personne",err })
    })


}
export async function deletePersonne(
  req: Request,
  res: Response
) {
  deletePersonneid(req.params.id)

    .then(function (delPersonne) {
      return res.status(201).json(delPersonne)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de supprimer la Personne" })
    })

}
export async function getAllPersonne(
  req: Request,
  res: Response
) {
  getallPersonne()
    .then(function (allPersonne) {
      return res.status(201).json(allPersonne)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de retouner la liste des Personnes", err })
    })
}
export async function getAllPersonneChef(
  req: Request,
  res: Response
) {
  getallPersonneChefDeFamille()
    .then(function (allPersonne) {
      return res.status(201).json(allPersonne)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de retouner la liste des Personnes", err })
    })
}
export async function getPersonneById(
  req: Request,
  res: Response
) {
  let result = 0;

  getPersonnebyId(parseInt(req.params.id))
    .then(function (Personne: any) {
      if(!Personne.is_cni){
        result ++;
      }
      if(!Personne.is_actenaissance){
        result ++;

      }
      if(Personne.is_autochtone){
        result ++;

      }

      if(!Personne.is_handicape && Personne?.avoirvulnerabilites.length){
        result = result + 1 + Personne.avoirvulnerabilites.length;

      }

      console.log(result, "pourcentage");



      return res.status(201).json(Personne)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de retouner la liste des Personnes" })
    })


}





