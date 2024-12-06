import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import Funcionarios from './funcionarios.js';
import Departamentos from './departamentos.js';


class Usuarios extends Model {}
Usuarios.init(
  {
    usuarioID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    usuarioLogin: { type: DataTypes.STRING, allowNull: false },
    usuarioSenha: { type: DataTypes.STRING, allowNull: false },
    usuarioFuncMat: { type: DataTypes.INTEGER(4), allowNull: false },
    usuarioSetor: { type: DataTypes.INTEGER(3), allowNull: false},
    usuarioStatus: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true}
  },
  {
    sequelize,
    modelName: "Usuarios"
  }
);

// Definição das chaves estrangeiras

Usuarios.belongsTo(Funcionarios, { foreignKey: 'usuarioFuncMat', as: 'funcionario' });
Funcionarios.hasOne(Usuarios, { foreignKey: 'usuarioFuncMat' });

Usuarios.belongsTo(Departamentos, { foreignKey: 'usuarioSetor', as: 'departamento' });
Departamentos.hasMany(Usuarios, { foreignKey: 'usuarioSetor' });

export default Usuarios;
