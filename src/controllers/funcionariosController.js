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
    
    try {
        await Funcionarios.create(data);
        res.status(201).redirect('/funcionarios');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};

funcionariosController.deletar = async (req, res) => {
    const { id } = req.params;

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
    const data = req.body;
    
    try {
        var func = await Funcionarios.findOne({where: {funcMatricula: id}});
        func.set(data);
        func.save();
        res.status(201).redirect('/funcionarios');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};


export default funcionariosController;