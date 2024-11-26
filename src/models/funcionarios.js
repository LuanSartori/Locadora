import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import Departamentos from './departamentos.js';
import Usuarios from './usuarios.js';


class Funcionarios extends Model {}
Funcionarios.init(
  {
    funcMatricula: {
      type: DataTypes.INTEGER(4),
      autoIncrement: true,
      primaryKey: true,
    },
    funcNome: { type: DataTypes.STRING(40), allowNull: false },
    funcDepto: { type: DataTypes.INTEGER(3), allowNull: false },
    funcSalario: { type: DataTypes.DECIMAL(8, 2), allowNull: false },
    funcAdmissao: { type: DataTypes.DATEONLY, allowNull: false },
    funcFilho: { type: DataTypes.INTEGER(2), allowNull: false },
    funcSexo: { type: DataTypes.STRING(1), allowNull: false },
    funcAtivo: { type: DataTypes.BOOLEAN, allowNull: false }
  },
  {
    sequelize,
    modelName: "Funcionarios"
  }
);

// Definição das chaves estrangeiras

Funcionarios.belongsTo(Departamentos, { foreignKey: 'funcDepto' });
Departamentos.hasMany(Funcionarios, { foreignKey: 'funcDepto' });

// Definicação dos triggers

Funcionarios.addHook('afterCreate', 'tr_add_usuarios', async (func, options) => {
  const dataSenha = func.funcAdmissao.replaceAll('-', '');
  await Usuarios.create({
      usuarioLogin: func.funcMatricula,
      usuarioSenha: dataSenha,
      usuarioFuncMat: func.funcMatricula,
      usuarioSetor: func.funcDepto,
      usuarioStatus: 1
  });
})

export default Funcionarios;
