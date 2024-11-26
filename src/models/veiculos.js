import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import Combustiveis from './combustiveis.js';
import Categorias from './categorias.js';


class Veiculos extends Model {}
Veiculos.init(
  {
    veicPlaca: {
      type: DataTypes.STRING(7),
      primaryKey: true,
    },
    veicMarca: { type: DataTypes.STRING(15), allowNull: false },
    veicModelo: { type: DataTypes.STRING(15), allowNull: false },
    veicCor: { type: DataTypes.STRING(15), allowNull: false },
    veicAno: { type: DataTypes.STRING(4), allowNull: false },
    veicComb: { type: DataTypes.STRING(2), allowNull: false },
    veicCat: { type: DataTypes.INTEGER(2), allowNull: false },
    veicStatusAlocado: { type: DataTypes.BOOLEAN, allowNull: false }
  },
  {
    sequelize,
    modelName: "Veiculos"
  }
);

// Definição das chaves estrangeiras

Veiculos.belongsTo(Combustiveis, { foreignKey: 'veicComb' });
Combustiveis.hasMany(Veiculos, { foreignKey: 'veicComb' });

Veiculos.belongsTo(Categorias, { foreignKey: 'veicCat' });
Categorias.hasMany(Veiculos, { foreignKey: 'veicCat' }); // Vários Veiculos apontam para Categorias

export default Veiculos;
