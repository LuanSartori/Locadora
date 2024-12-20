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
    };
};

funcionariosController.buscarFuncionario = async (req, res) => {
    const { funcMatricula } = req.query;

    try {
        const funcionario = await Funcionarios.findByPk(funcMatricula);
        if (!funcionario) {
            res.status(400).json({ erro: "Funcionário não encontrado. "});
            return;
        }
        res.status(200).json(funcionario);
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};

funcionariosController.cadastrar = async (req, res) => {
    const {funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo} = req.body;

    if (!{funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo}) {
        res.status(400).json({message: 'Campos obrigatórios incompletos, preencha todos.' });
        return;
    } else if (await Funcionarios.findByPk(funcMatricula)){
        res.status(400).json({message: 'Essa matrícula já existe. Tente novamente.' });
        return;
    };

    try {
        await Funcionarios.create({
            funcNome: funcNome,
            funcDepto: funcDepto,
            funcSalario: funcSalario,
            funcAdmissao: funcAdmissao,
            funcFilho: funcFilho,
            funcSexo: funcSexo,
            funcAtivo: funcAtivo
        });
        res.status(201).redirect('/funcionarios');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};

funcionariosController.deletar = async (req, res) => {
    const { id } = req.params;
    
    try {
        const funcionario = await Funcionarios.findByPk(id);
        if (!funcionario) {
            res.status(404).json({ 'erro': 'Funcionário não encontrado!' });
            return;
        };
        await funcionario.destroy();

        res.status(201).redirect('/funcionarios');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    };
};

funcionariosController.editar = async (req, res) => {
    const { id } = req.params;

    try {
        const funcionario = await Funcionarios.findOne({where: {funcMatricula: id}});
        res.status(200).render('funcionarios_edit', {
            data: funcionario
        })
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    };
};

funcionariosController.atualizar = async (req, res) => {
    const { id } = req.params;
    const { funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo } = req.body;
    
    try {
        var func = await Funcionarios.findByPk(id);
        if (!func) {
            res.status(404).json({ 'erro': 'Funcionário não encontrado!' });
        } else if(funcNome == func.funcNome && funcDepto == func.funcDepto && funcSalario == func.funcSalario && funcAdmissao == func.funcAdmissao && funcFilho == func.funcFilho && funcSexo == func.funcSexo && funcAtivo == func.funcAtivo){
            res.status(400).json({message: 'Nenhum campo atualizado. Atualize ao menos um campo para salvar as alterações.' });
            return;
        };

        func.set({
            funcNome: funcNome || func.funcNome,
            funcDepto: funcDepto || func.funcDepto,
            funcSalario: funcSalario || func.funcSalario,
            funcAdmissao: funcAdmissao || func.funcAdmissao,
            funcFilho: funcFilho || func.funcFilho,
            funcSexo: funcSexo || func.funcSexo,
            funcAtivo: funcAtivo == undefined ? false : true
        });
        await func.save();
        res.status(201).redirect('/funcionarios');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    };
};


export default funcionariosController;