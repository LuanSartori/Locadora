import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';


class Categorias extends Model {}
Categorias.init(
  {
    catCod: {
      type: DataTypes.INTEGER(2),
      autoIncrement: true,
      primaryKey: true,
    },
    catNome: { type: DataTypes.STRING(20), allowNull: false },
    catValor_km: { type: DataTypes.DECIMAL(8, 2), allowNull: false }
  },
  {
    sequelize,
    modelName: "Categorias"
  }
)


export default Categorias;
