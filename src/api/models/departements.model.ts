import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/database/sequelize";
import CommunesModel from "./communes.model";

interface DepartementsAttributes {
  id: number;
  departement: string;
}

class DepartementsModel
  extends Model<DepartementsAttributes>
  implements DepartementsAttributes
{
  public id!: number;
  public departement!: string;
}

DepartementsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    departement: {
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
    modelName: "departements",
    freezeTableName: true,
    timestamps: true,
  }
);
DepartementsModel.hasMany(CommunesModel, {
  foreignKey: {
    name: "departement_id",
    allowNull: false,
  },
});

CommunesModel.belongsTo(DepartementsModel, {
  foreignKey: {
    name: "departement_id",
    allowNull: false,
  },
});

// Ensure the table is created and ready to use
// (async () => {
//   await sequelize.sync({ force: false });
//   // Additional code for initialization, if needed
// })();

export default DepartementsModel;
