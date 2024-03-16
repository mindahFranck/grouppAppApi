import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/database/sequelize";
import PersonnesModel from "./personnes.model";

interface UtilisateursAttributes {
  id: number;
  username: string;
  password: string;
  raisonSociale: string;
  nom: string;
  prenoms: string;

  // Add other attributes if needed
}

class UtilisateursModel
  extends Model<UtilisateursAttributes>
  implements UtilisateursAttributes
{
  public id!: number;
  public username!: string;
  public password!: string;
  public raisonSociale!:string;
  public nom!:string;
  public prenoms!:string;
  // Add other attributes if needed
} 

UtilisateursModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    raisonSociale: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    prenoms: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "utilisateurs",
    tableName: "utilisateurs",
    freezeTableName: true,
    timestamps: true,
  }
);
UtilisateursModel.hasMany(PersonnesModel);
PersonnesModel.belongsTo(UtilisateursModel);

// Ensure the table is created and ready to use
(async () => {
  await sequelize.sync({ force: false });
  // Additional code for initialization, if needed
})();

export default UtilisateursModel;
