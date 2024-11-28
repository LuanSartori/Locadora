import Departamentos from "../models/departamentos.js";
import Funcionarios from "../models/funcionarios.js";
const funcionariosController = {};


funcionariosController.listar = async (req, res) => {
    try {
        const funcionarios = await Funcionarios.findAll({include: Departamentos});
        const departamentos = await Departamentos.findAll();
        res.status(200).render('funcionarios', {
            funcionarios: funcionarios,
            departamentos: departamentos
        })
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};

funcionariosController.cadastrar = async (req, res) => {
    const data = req.body;

    // TODO: Validações
    
    try {
        await Funcionarios.create({
            funcNome: data.funcNome,
            funcDepto: data.funcDepto,
            funcSalario: data.funcSalario,
            funcAdmissao: data.funcAdmissao,
            funcFilho: data.funcFilho,
            funcSexo: data.funcSexo,
            funcAtivo: data.funcAtivo
        });
        res.status(201).redirect('/funcionarios');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};

funcionariosController.deletar = async (req, res) => {
    const { id } = req.params;

    // TODO: Verificar permissão

    try {
        await Funcionarios.destroy({where: {funcMatricula: id}});
        res.status(201).redirect('/funcionarios');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};

funcionariosController.editar = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Funcionarios.findOne({where: {funcMatricula: id}});
        res.status(200).render('funcionarios_edit', {
            data: usuario
        })
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};

funcionariosController.atualizar = async (req, res) => {
    const { id } = req.params;
    const { funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo } = req.body;

    // TODO: Validações
    
    try {
        var func = await Funcionarios.findOne({where: {funcMatricula: id}});
        func.set({
            funcNome: funcNome || func.funcNome,
            funcDepto: funcDepto || func.funcDepto,
            funcSalario: funcSalario || func.funcSalario,
            funcAdmissao: funcAdmissao || func.funcAdmissao,
            funcFilho: funcFilho || func.funcFilho,
            funcSexo: funcSexo || func.funcSexo,
            funcAtivo: funcAtivo || func.funcAtivo
        });
        await func.save();
        res.status(201).redirect('/funcionarios');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};


export default funcionariosController;