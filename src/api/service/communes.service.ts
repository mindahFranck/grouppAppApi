import CommunesModel from "../models/communes.model";

const exceljs = require('exceljs');





export async function createCommunes(value: any) {

    let newCommunes = CommunesModel.create(
        value
    );

    return newCommunes


}

export async function findCommunes(value: any) {
    const val = await CommunesModel.findOne({
        where: { id: value }
    })
    return val
}



export async function getallCommunes() {

    const Communes = await CommunesModel.findAll();
    return Communes;


}
export async function deleteCommunesid(id: number) {

    await CommunesModel.destroy({
        where: {
            id: id
        }
    });
    return id;

}
export async function getCommunesbyId(id: number) {

    const Communes = await CommunesModel.findByPk(id);
    return Communes;


}
export async function updatedCommunes(id: number, value: any) {
    const data = await CommunesModel.update(value, {
        where: {
            id: id
        }
    });
    return data;
}
export async function importsCommunes(params:any) {
    const fileBuffer = params.buffer;

    let data: { id: any; departement_id: any;commune:any }[] = [];
    const workbook = new exceljs.Workbook();

    await workbook.xlsx.load(fileBuffer);

    const worksheet = workbook.getWorksheet(1);

    worksheet.eachRow(async (row:any, rowNumber:any) => {

      // Traitez chaque ligne et sauvegardez les données dans la base de données
      const id = row.getCell(1).value; // En supposant que le nom soit dans la première colonne
      const commune = row.getCell(3).value; // En supposant que le nom soit dans la première colonne
      const departement_id = row.getCell(2).value; // En supposant que le nom soit dans la première colonne


        if(id && departement_id && commune){
            const value ={
                "id": id,
                "departement_id": departement_id,
                "commune": commune
            }
            data.push(value);
                  // Sauvegardez dans la base de données en utilisant Sequelize

        }

    });
    for( let i =0 ; i < data.length; i++){

       const datas = await CommunesModel.create( data[i] );


    }
    return "ok";
    
}