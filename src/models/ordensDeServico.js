import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';


const OrdensDeServico = sequelize.define("OrdensDeServico", {
  osNum: {
    type: DataTypes.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
  },
  osFuncMat: { type: DataTypes.INTEGER(4), allowNull: false },
  osClienteID: { type: DataTypes.INTEGER(10), allowNull: false },
  osVeicPlaca: { type: DataTypes.STRING(7), allowNull: false },
  osDataRetirada: { type: DataTypes.DATEONLY, allowNull: false },
  osDataDevolucao: { type: DataTypes.DATEONLY, allowNull: true },
  osKMDevolucao: { type: DataTypes.DECIMAL(8, 2), allowNull: true },
  osStatus: { type: DataTypes.BOOLEAN, allowNull: false },
  osValorPgto: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
});


export default OrdensDeServico;