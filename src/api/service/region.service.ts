import RegionsModel from "../models/region.model";

const exceljs = require('exceljs');





export async function createRegions(value: any) {

    let newRegions = RegionsModel.create(
        value
    );

    return newRegions


}

export async function findRegions(value: any) {
    const val = await RegionsModel.findOne({
        where: { id: value }
    })
    return val
}



export async function getallRegions() {

    const Regions = await RegionsModel.findAll();
    return Regions;


}
export async function deleteRegionsid(id: number) {

    await RegionsModel.destroy({
        where: {
            id: id
        }
    });
    return id;

}
export async function getRegionsbyId(id: number) {

    const Regions = await RegionsModel.findByPk(id);
    return Regions;


}
export async function updatedRegions(id: number, value: any) {
    const data = await RegionsModel.update(value, {
        where: {
            id: id
        }
    });
    return data;
}
export async function importsRegions(params:any) {
    const fileBuffer = params.buffer;
    let data: { id: any; region: any; }[] = [];
    const workbook = new exceljs.Workbook();

    await workbook.xlsx.load(fileBuffer);

    const worksheet = workbook.getWorksheet(1);

    worksheet.eachRow(async (row:any, rowNumber:any) => {
      // Traitez chaque ligne et sauvegardez les données dans la base de données
      const region = row.getCell(2).value; // En supposant que le nom soit dans la première colonne
      const id = row.getCell(1).value; // En supposant que le nom soit dans la première colonne
        
        if(region && id){
            const value ={
                "id": id,
                "region": region,
            }
            data.push(value);
                  // Sauvegardez dans la base de données en utilisant Sequelize

        }

    });
    for( let i =0 ; i < data.length; i++){
        await RegionsModel.create( data[i] );


    }
    return "ok";
    
}