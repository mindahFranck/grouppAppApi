import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/database/sequelize";
import DepartementsModel from "./departements.model";
import PersonnesModel from "./personnes.model";

interface RegionsAttributes {
  id: number;
  region: string;
}

class RegionsModel
  extends Model<RegionsAttributes>
  implements RegionsAttributes
{
  public id!: number;
  public region!: string;
}

RegionsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [1, 255],
      },
    }
  },
  {
    sequelize,
    modelName: "regions",
    freezeTableName: true,
    timestamps: true,
  }
);
RegionsModel.hasMany(DepartementsModel, {
  foreignKey: {
    name: "region_id",
    allowNull: false,
  },
});

DepartementsModel.belongsTo(RegionsModel, {
  foreignKey: {
    name: "region_id",
    allowNull: false,
  },
});

RegionsModel.hasMany(PersonnesModel);
  
  PersonnesModel.belongsTo(RegionsModel);

// Ensure the table is created and ready to use
// (async () => {
//   await sequelize.sync({ force: false });
//   // Additional code for initialization, if needed
// })();

export default RegionsModel;
