import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';


const Veiculos = sequelize.define("Veiculos", {
  veicPlaca: {
    type: DataTypes.STRING(7),
    primaryKey: true,
  },
  veicMarca: { type: DataTypes.STRING(15), allowNull: false },
  veicModelo: { type: DataTypes.STRING(15), allowNull: false },
  veicCor: { type: DataTypes.STRING(15), allowNull: false },
  veicAno: { type: DataTypes.STRING(4), allowNull: false },
  // veicComb: { 
  //   type: DataTypes.STRING(1),
  //   references: {
  //     model: Combustiveis,
  //     key: combTipo
  //   }
  //  },
  // veicCat: { 
  //   type: DataTypes.NUMBER(1),
  //   references: {
  //       model: Categorias,
  //       key: catCod
  //   }
  //  },
  veicStatusAlocado: { type: DataTypes.BOOLEAN, allowNull: false }
});


export default Veiculos;