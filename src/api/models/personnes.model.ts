import AvoirVulnerabilite from "./avoirvulnerabilite.model";
import ResidenceModel from "./residence.model";
import { Sequelize, Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/database/sequelize";

class PersonnesModel extends Model {}

PersonnesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_naissance: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    statut: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sexe: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_cni: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    is_actenaissance: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    is_autochtone: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    is_handicape: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    is_chef_menage: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "personnesmodel", // Utilisez un nom de modèle sans espaces ni caractères spéciaux
    freezeTableName: true,
    timestamps: true,
  }
);

ResidenceModel.hasMany(PersonnesModel, { foreignKey: "idresidence" });
PersonnesModel.belongsTo(ResidenceModel, { foreignKey: "idresidence" });

PersonnesModel.hasMany(PersonnesModel, {
  foreignKey: "parentId",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
  as: "Children",
});
PersonnesModel.belongsTo(PersonnesModel, {
  foreignKey: "parentId",
  as: "Parent",
});

PersonnesModel.hasMany(AvoirVulnerabilite, { foreignKey: "idPer" });
AvoirVulnerabilite.belongsTo(PersonnesModel, { foreignKey: "idPer" });

(async () => {
  await sequelize.sync({ force: false });
  // Code here
})();

export default PersonnesModel;
