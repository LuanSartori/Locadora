import Categorias from "./categorias.js";
import Clientes from "./clientes.js";
import Combustiveis from "./combustiveis.js";
import Departamentos from "./departamentos.js";
import Funcionarios from "./funcionarios.js";
import OrdensDeServico from "./ordensDeServico.js";
import Usuarios from "./usuarios.js";
import Veiculos from "./veiculos.js";


// CATEGORIAS
Categorias.hasMany(Veiculos, { foreignKey: 'veicCat' }); // Vários Veiculos apontam para Categorias

// CLIENTES
Clientes.hasMany(OrdensDeServico, { foreignKey: 'osClienteID' }); // Várias OrdensDeServico apontam para Clientes

// COMBUSTIVEIS
Combustiveis.hasMany(Veiculos, { foreignKey: 'veicComb' }); // Vários Veiculos apontam para Combustiveis

// DEPARTAMENTOS
Departamentos.hasMany(Funcionarios, { foreignKey: 'funcDepto' }); // Vários Funcionarios podem apontar para um mesmo departamento
Departamentos.hasMany(Usuarios, { foreignKey: 'usuarioSetor' }); // Vários Usuarios podem apontar para um mesmo departamento

// FUNCIONARIOS
Funcionarios.belongsTo(Departamentos, { foreignKey: 'funcDepto' }); // Funcionarios terá um chave apontando para Departamentos

Funcionarios.hasOne(Usuarios, { foreignKey: 'usuarioFuncMat' }); // Usuarios terá um chave apontando para Funcionarios
Funcionarios.hasMany(OrdensDeServico, { foreignKey: 'osFuncMat' }); // Váris OrdensDeServico apontam para Funcionarios

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


// ORDENSDESERVICO
OrdensDeServico.belongsTo(Funcionarios, { foreignKey: 'osFuncMat' }); // OrdensDeServico tem uma chave apontando para Funcionarios
OrdensDeServico.belongsTo(Clientes, { foreignKey: 'osClienteID' }); // OrdensDeServico tem uma chave apontando para Clientes
OrdensDeServico.belongsTo(Veiculos, { foreignKey: 'osVeicPlaca' }); // OrdensDeServico tem uma chave apontando para Veiculos

OrdensDeServico.addHook('afterCreate', 'tr_alocar_veiculo', async (os, options) => {
    const veic = await os.getVeiculo();
    console.log(veic);
    veic.veicStatusAlocado = 1;
    veic.save();
})

// USUARIOS
Usuarios.belongsTo(Funcionarios, { foreignKey: 'usuarioFuncMat' }); // Usarios tem uma chave apontando para Funcionarios
Usuarios.belongsTo(Departamentos, { foreignKey: 'usuarioSetor' }); // Usarios tem uma chave apontando para Departamentos

// VEICULOS
Veiculos.belongsTo(Combustiveis, { foreignKey: 'veicComb' }); // Veiculos terá uma chave apontando para Combustiveis
Veiculos.belongsTo(Categorias, { foreignKey: 'veicCat' }); // Veiculos terá uma chave apontando para Categorias

Veiculos.hasMany(OrdensDeServico, { foreignKey: 'osVeicPlaca' }); // Várias OrdensDeServico apontam para Veiculos


export { Categorias, Clientes, Combustiveis, Departamentos, Funcionarios, OrdensDeServico, Usuarios, Veiculos };