import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';


const Categorias = sequelize.define("Categorias", {
  catCod: {
    type: DataTypes.INTEGER(2),
    autoIncrement: true,
    primaryKey: true,
  },
  catNome: { type: DataTypes.STRING(20), allowNull: false },
  catValor_km: { type: DataTypes.DECIMAL(8, 2), allowNull: false}
});


export default Categorias;