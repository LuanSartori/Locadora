import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';


const Combustiveis = sequelize.define("Combustiveis", {
  combTipo: {
    type: DataTypes.INTEGER(2),
    autoIncrement: true,
    primaryKey: true,
  },
  combNome: { type: DataTypes.STRING(20), allowNull: false }
});


export default Combustiveis;