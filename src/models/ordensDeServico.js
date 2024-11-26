import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import Funcionarios from './funcionarios.js';
import Clientes from './clientes.js';
import Veiculos from './veiculos.js';


class OrdensDeServico extends Model {}
OrdensDeServico.init(
  {
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
  },
  {
    sequelize,
    modelName: "OrdensDeServico"
  }
);

// Definição das chaves estrangeiras

OrdensDeServico.belongsTo(Funcionarios, { foreignKey: 'osFuncMat' });
Funcionarios.hasMany(OrdensDeServico, { foreignKey: 'osFuncMat' });

OrdensDeServico.belongsTo(Clientes, { foreignKey: 'osClienteID' });
Clientes.hasMany(OrdensDeServico, { foreignKey: 'osClienteID' });

OrdensDeServico.belongsTo(Veiculos, { foreignKey: 'osVeicPlaca' });
Veiculos.hasMany(OrdensDeServico, { foreignKey: 'osVeicPlaca' });

// Definicação dos triggers

OrdensDeServico.addHook('afterCreate', 'tr_alocar_veiculo', async (os, options) => {
  const veic = await os.getVeiculo();
  veic.veicStatusAlocado = 1;
  veic.save();
})

export default OrdensDeServico;
