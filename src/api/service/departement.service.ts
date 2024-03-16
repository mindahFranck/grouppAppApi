import DepartementsModel from "../models/departements.model";

const exceljs = require('exceljs');





export async function createDepartements(value: any) {

    let newDepartements = DepartementsModel.create(
        value
    );

    return newDepartements


}

export async function findDepartements(value: any) {
    const val = await DepartementsModel.findOne({
        where: { id: value }
    })
    return val
}



export async function getallDepartements() {

    const Departements = await DepartementsModel.findAll();
    return Departements;


}
export async function deleteDepartementsid(id: number) {

    await DepartementsModel.destroy({
        where: {
            id: id
        }
    });
    return id;

}
export async function getDepartementsbyId(id: number) {

    const Departements = await DepartementsModel.findByPk(id);
    return Departements;


}
export async function updatedDepartements(id: number, value: any) {
    const data = await DepartementsModel.update(value, {
        where: {
            id: id
        }
    });
    return data;
}
export async function importsDepartements(params:any) {
    const fileBuffer = params.buffer;
    let data: { id: any; region_id: any;departement:any }[] = [];
    const workbook = new exceljs.Workbook();

    await workbook.xlsx.load(fileBuffer);

    const worksheet = workbook.getWorksheet(1);

    worksheet.eachRow(async (row:any, rowNumber:any) => {
      // Traitez chaque ligne et sauvegardez les données dans la base de données
      const region = row.getCell(2).value; // En supposant que le nom soit dans la première colonne
      const id = row.getCell(1).value; // En supposant que le nom soit dans la première colonne
      const departement = row.getCell(3).value; // En supposant que le nom soit dans la première colonne

        if(region && id){
            const value ={
                "id": id,
                "region_id": region,
                "departement": departement,
            }
            data.push(value);
                  // Sauvegardez dans la base de données en utilisant Sequelize

        }

    });
    for( let i =0 ; i < data.length; i++){
        await DepartementsModel.create( data[i] );


    }
    return "ok";
    
}