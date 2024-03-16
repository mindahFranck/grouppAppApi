import AvoirVulnerabilite from "../models/avoirvulnerabilite.model";
import CommunesModel from "../models/communes.model";
import PersonnesModel from "../models/personnes.model";
import QuartiersModel from "../models/quartiers.model";
import RegionsModel from "../models/region.model";
import ResidenceModel from "../models/residence.model";
import VulnerabiliteModel from "../models/vulnerabilite.model";





export async function createPersonne(value: any) {

    const newPersonne = PersonnesModel.create(
        value
    );
    return newPersonne


}

export async function findPersonne(value: any) {
    const val = await PersonnesModel.findOne({
        where: { id: value }
    })
    return val
}



export async function getallPersonne() {

    const Personne = await PersonnesModel.findAll();
    return Personne;


}
export async function getallPersonneChefDeFamille() {

    const Personne = await PersonnesModel.findAll({
        where: {
            is_chef_menage: true
        }
    });
    return Personne;


}
export async function deletePersonneid(id: string) {

    await PersonnesModel.destroy({
        where: {
            id: id
        }
    });
    return id;

}
export async function getPersonnebyId(id: number) {

    const Personne = await PersonnesModel.findByPk(id,{
        include:[
            {
                model: AvoirVulnerabilite,
                include:[{
                    model:VulnerabiliteModel
                }]
            },
            {
                model: RegionsModel
            },

            {
                model: ResidenceModel,
                include:[
                    {
                        model: QuartiersModel,
                        include:[
                            {
                                model: CommunesModel,
                            }
                        ]
                    }
                ]

            },
            {
                model: PersonnesModel,
                as: 'Children'
            },
            {
                model: PersonnesModel,
                as: 'Parent'
            },
        ],
        
    }
        
);
    return Personne;


}
export async function updatedPersonne(id: string, value: any) {
    const data = await PersonnesModel.update(value, {
        where: {
            id: id
        }
    });
    return data;
}