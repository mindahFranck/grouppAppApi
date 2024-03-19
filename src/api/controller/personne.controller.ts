import { Request, Response } from "express";
import { createPersonne, deletePersonneid, getPersonnebyId, getallPersonne, getallPersonneChefDeFamille, searchsFilter, updatedPersonne } from "../service/personne.service";
import { createAvoir } from "../service/avoir.service";
import VulnerabiliteModel from "../models/vulnerabilite.model";


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
    .then(async function (Personne: any) {

      const dateDeNaissance = new Date(Personne.date_naissance);
      const age = calculerAge(dateDeNaissance);

      if(!Personne.is_cni){
        result ++;
      }
      if(!Personne.is_actenaissance){
        result ++;

      }
      if(Personne.is_autochtone){
        result ++;

      }
      if(age <= 5 || age >= 60){
        result ++;

      }
      
      if(Personne.is_handicape && Personne?.avoirvulnerabilites.length > 0){
        result = result + 1 + Personne.avoirvulnerabilites.length;

      }
      if(Personne.is_handicape == false && Personne?.avoirvulnerabilites.length > 0){
        result = result + Personne.avoirvulnerabilites.length;

      }
      const vulnerabilite = await VulnerabiliteModel.count();


      let value=( result/(vulnerabilite+5))*100
      return res.status(201).json({"data":Personne, "pourcentage":value})
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de retouner la liste des Personnes" })
    })


}
function calculerAge(dateNaissance: Date): number {
    const maintenant = new Date();
    const anneeMaintenant = maintenant.getFullYear();
    const moisMaintenant = maintenant.getMonth();
    const jourMaintenant = maintenant.getDate();

    const anneeNaissance = dateNaissance.getFullYear();
    const moisNaissance = dateNaissance.getMonth();
    const jourNaissance = dateNaissance.getDate();

    let age = anneeMaintenant - anneeNaissance;

    if (moisMaintenant < moisNaissance || (moisMaintenant === moisNaissance && jourMaintenant < jourNaissance)) {
        age--;
    }

    return age;
}


export async function filter(
  req: Request,
  res: Response
) {
      // Récupérer les paramètres de requête
       req.query;

      // Construire les options de filtre
      const filterOptions: any = req.query;
  

  searchsFilter(filterOptions)
    .then(function (personnes) {
      return res.status(201).json(personnes)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de retouner la liste des personnes", err })
    })


}





