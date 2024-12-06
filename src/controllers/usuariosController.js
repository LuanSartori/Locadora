import Departamentos from "../models/departamentos.js";
import Funcionarios from "../models/funcionarios.js";
import Usuarios from "../models/usuarios.js";
const usuariosController = {};


usuariosController.listar = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll({include: [{model: Funcionarios, as: 'funcionario', attributes: ['funcNome']}, {model: Departamentos, as: 'departamento', attributes: ['deptoNome']}]});
        const funcionarios = await Funcionarios.findAll({ attributes: ['funcMatricula', 'funcNome'] });
        const departamentos = await Departamentos.findAll({ attributes: ['deptoCodigo', 'deptoNome'] });
        res.status(200).render('usuarios', {
            usuarios: usuarios,
            funcionarios: funcionarios,
            departamentos: departamentos
        })
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    };
};

usuariosController.buscarUsuario = async (req, res) => {
    const { id } = req.query;

    try {
        const usuario = await Usuarios.findByPk(id);
        if (!usuario) {
            res.status(400).json({ erro: "Usuário não encontrado. "});
            return;
        }
        res.status(200).json(usuario);
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};

usuariosController.cadastrar = async (req, res) => {
    const {usuarioLogin, usuarioSenha, usuarioFuncMat, usuarioSetor} = req.body;

    try {
        if (!usuarioLogin || !usuarioSenha || !usuarioFuncMat || !usuarioSetor) {
            res.status(400).json({message: 'Campos obrigatórios incompletos, preencha todos.' });
            return;
        } else if (await Usuarios.findOne({where: {usuarioLogin: usuarioLogin} })){
            res.status(400).json({message: 'Esse usuário já existe. Tente novamente.' });
            return;
        };

        await Usuarios.create({
            usuarioLogin: usuarioLogin,
            usuarioSenha: usuarioSenha,
            usuarioFuncMat: usuarioFuncMat,
            usuarioSetor: usuarioSetor
        });
        res.status(201).redirect('/usuarios');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    };
};

usuariosController.deletar = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Usuarios.findByPk(id);
        if (!usuario) {
            res.status(404).json({ 'erro': 'Usuário não encontrado' });
            return;
        };
        usuario.destroy();
        res.status(201).redirect('/usuarios');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    };
};

usuariosController.editar = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Usuarios.findOne({where: {usuarioID: id}});
        res.status(200).render('usuarios_edit', {
            data: usuario
        })
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    };
};

usuariosController.atualizar = async (req, res) => {
    const { id } = req.params;
    const { usuarioLogin, usuarioSenha, usuarioFuncMat, usuarioSetor, usuarioStatus } = req.body;

    try {
        var usuario = await Usuarios.findByPk(id);
        if (!usuario) {
            res.status(404).json({ 'erro': 'Usuário não encontrado!' });
        } else if(usuarioLogin == usuario.usuarioLogin && usuarioSenha == usuario.usuarioSenha && usuarioFuncMat == usuario.usuarioFuncMat && usuarioSetor == usuario.usuarioSetor && usuarioStatus == usuario.usuarioStatus){
            res.status(400).json({message: 'Nenhum campo atualizado. Atualize ao menos um campo para salvar as alterações.' });  
            return;
        } else if(usuarioLogin != usuario.usuarioLogin && await Usuarios.findOne({where : {usuarioLogin: usuarioLogin} })){
            res.status(400).json({message: 'Este login já existe, tente novamente.' });  
            return;
        };
        usuario.set({
            usuarioLogin: usuarioLogin || usuario.usuarioLogin,
            usuarioSenha: usuarioSenha || usuario.usuarioSenha,
            usuarioFuncMat: usuarioFuncMat || usuario.usuarioFuncMat,
            usuarioSetor: usuarioSetor || usuario.usuarioSetor,
            usuarioStatus: usuarioStatus || usuario.usuarioStatus
        });
        await usuario.save();
        res.status(201).redirect('/usuarios');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};


export default usuariosController;