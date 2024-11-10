import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';


const Departamentos = sequelize.define("Departamentos", {
  deptoCodigo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  deptoNome: { type: DataTypes.STRING(20), allowNull: false }
});


export default Departamentos;