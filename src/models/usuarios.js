import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';


const Usuarios = sequelize.define("Usuarios", {
  usuarioID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  usuarioLogin: { type: DataTypes.STRING, allowNull: false },
  usuarioSenha: { type: DataTypes.STRING, allowNull: false },
  usuarioFuncMat: { type: DataTypes.INTEGER(4), allowNull: false },
  usuarioSetor: { type: DataTypes.DATEONLY, allowNull: false},
  usuarioStatus: { type: DataTypes.BOOLEAN, allowNull: false }
});


export default Usuarios;