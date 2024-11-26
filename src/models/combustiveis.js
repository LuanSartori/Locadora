import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';


class Combustiveis extends Model {}
Combustiveis.init(
  {
    combTipo: {
      type: DataTypes.STRING(2),
      primaryKey: true,
    },
    combNome: { type: DataTypes.STRING(20), allowNull: false }
  },
  {
    sequelize,
    modelName: "Combustiveis"
  }
);


export default Combustiveis;
