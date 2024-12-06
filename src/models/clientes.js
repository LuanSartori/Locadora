import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';


class Clientes extends Model {}
Clientes.init(
  {
  clienteID: {
    type: DataTypes.INTEGER(10),
    autoIncrement: true,
    primaryKey: true,
  },
  clienteCPF: { type: DataTypes.STRING(9), allowNull: false },
  clienteNome: { type: DataTypes.STRING(40), allowNull: false },
  clienteEnde: { type: DataTypes.STRING(60), allowNull: false },
  clienteTel: { type: DataTypes.STRING(15), allowNull: false },
  clienteCidade: { type: DataTypes.STRING(60), allowNull: false },
  clienteDataNasc: { type: DataTypes.DATEONLY, allowNull: false },
  clienteCNH: { type: DataTypes.STRING(11), allowNull: false },
  clienteCNHCat: { type: DataTypes.STRING(2), allowNull: false },
  },
  {
    sequelize,
    modelName: "Clientes"
  }
);

export default Clientes;
