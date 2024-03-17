import sequelize from "sequelize";
import AvoirVulnerabilite from "../models/avoirvulnerabilite.model";
import CommunesModel from "../models/communes.model";
import PersonnesModel from "../models/personnes.model";
import QuartiersModel from "../models/quartiers.model";
import RegionsModel from "../models/region.model";
import ResidenceModel from "../models/residence.model";
import UtilisateursModel from "../models/utilisateurs.model";
import VulnerabiliteModel from "../models/vulnerabilite.model";






export async function createAvoir(value: any) {

    let newAvoir = AvoirVulnerabilite.create(
        value
    );

    return newAvoir


}

export async function findAvoir(value: any) {
    const val = await AvoirVulnerabilite.findOne({
        where: { id: value }
    })
    return val
}

export async function getallstate(){
    const data = [];
    const personnes = await PersonnesModel.count();
    const vulnerabilite = await VulnerabiliteModel.count();
    const quartiers = await QuartiersModel.count();
    const commune = await CommunesModel.count();
    const residences = await ResidenceModel.count();
    const residence:any = await ResidenceModel.findAll({
        attributes: [
            [sequelize.fn('SUM', sequelize.literal('(SELECT COUNT(*) FROM personnesmodel WHERE personnesmodel.idresidence = residence.id)')), 'total_personnes'],
            [sequelize.fn('COUNT', sequelize.literal('(SELECT COUNT(*) FROM personnesmodel WHERE personnesmodel.idresidence = residence.id)')), 'nombre_residences']
          ],
          include: [{
            model: PersonnesModel,
            required: true 
          }],
          raw: true
    })
    const totalPersonnes = residence[0].total_personnes;
    const nombreResidences = residence[0].nombre_residences;

    const moyenne = totalPersonnes / nombreResidences;
    const lastInsertPerson = await PersonnesModel.findAll({
        order: [['createdAt', 'DESC']],
        limit: 5,
        include:[
            {
            model: ResidenceModel,
            include: [{
                model: QuartiersModel
            }]
        },
        {
            model: RegionsModel
        }, 
        {
            model: UtilisateursModel,
            attributes: ["nom", "username"]
        }
    ]

    })
    const vulnerabilitePersonne = await VulnerabiliteModel.findAll({
        include:[
            {
                model: AvoirVulnerabilite,
                include:[{
                    model: PersonnesModel
                }]
            }
        ]
    });
    let value:any;


    const regions = await RegionsModel.findAll({
        attributes: [
            "id",
            "region",
            [
              sequelize.literal(
                "(SELECT COUNT(*) FROM personnesmodel WHERE personnesmodel.regionId = regions.id)"
              ),
              "numPeople",
            ],
          ],
          order: [[sequelize.literal("numPeople"), "DESC"]],
          limit: 5
      });

    for(value of vulnerabilitePersonne){
        let temporaile = {"libelle": value.nom, "nombre":value.avoirvulnerabilites.length};
        data.push(temporaile);
    }
    
    const state = {
        "nbrePersonne": personnes,
        "nbreCommune": commune,
        "nbreVulnerabilite": vulnerabilite,
        "nbreQuartiers": quartiers,
        "dernierPersonneEnregistre": lastInsertPerson,
        "vulnerabiliteState": data,
        "personnesParRegions":regions,
        "moyenneDuNombreDePersonneParResidence": moyenne,
        "nombreDeRidence": residences

    }

    return state;

}

export async function getallAvoir() {

    const Avoir = await AvoirVulnerabilite.findAll();
    return Avoir;


}
export async function deleteAvoirid(id: number) {

    await AvoirVulnerabilite.destroy({
        where: {
            id: id
        }
    });
    return id;

}

export async function updatedAvoir(id: number, value: any) {
    const data = await AvoirVulnerabilite.update(value, {
        where: {
            id: id
        }
    });
    return data;
}