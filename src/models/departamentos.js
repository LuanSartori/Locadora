import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';


class Departamentos extends Model {}
Departamentos.init(
  {
    deptoCodigo: {
      type: DataTypes.INTEGER(3),
      autoIncrement: true,
      primaryKey: true,
    },
    deptoNome: { type: DataTypes.STRING(20), allowNull: false }
  },
  {
    sequelize,
    modelName: "Departamentos"
  }
);


export default Departamentos;
