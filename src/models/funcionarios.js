import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';


const Funcionarios = sequelize.define("Funcionarios", {
  funcMatricula: {
    type: DataTypes.INTEGER(4),
    autoIncrement: true,
    primaryKey: true,
  },
  funcNome: { type: DataTypes.STRING(40), allowNull: false },
  // funcDepto: { 
  //   type: DataTypes.INTEGER(3),
  //   references: {
  //     model: Departamentos,
  //     key: Departamentos.deptoCod
  //   }
  //  },
  funcSalario: { type: DataTypes.DECIMAL(8, 2), allowNull: false },
  funcAdmissao: { type: DataTypes.DATEONLY, allowNull: false },
  funcFilho: { type: DataTypes.INTEGER(2), allowNull: false },
  funcSexo: { type: DataTypes.STRING(1), allowNull: false },
  funcAtivo: { type: DataTypes.BOOLEAN, allowNull: false }
});


export default Funcionarios;