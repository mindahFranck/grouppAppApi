import QuartiersModel from "./quartiers.model";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/database/sequelize";

interface CommunesAttributes {
  id: number;
  commune: string;
}

class CommunesModel
  extends Model<CommunesAttributes>
  implements CommunesAttributes
{
  public id!: number;
  public commune!: string;
}

CommunesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    commune: {
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
    modelName: "communes",
    freezeTableName: true,
    timestamps: true,
  }
);
CommunesModel.hasMany(QuartiersModel, {
  foreignKey: {
    name: "idCommunes",
    allowNull: false,
  },
});

QuartiersModel.belongsTo(CommunesModel, {
  foreignKey: {
    name: "idCommunes",
    allowNull: false,
  },
});

// Ensure the table is created and ready to use
// (async () => {
//   await sequelize.sync({ force: false });
//   // Additional code for initialization, if needed
// })();

export default CommunesModel;
