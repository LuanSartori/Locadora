import Usuarios from "../models/usuarios.js";
const usuariosController = {};


usuariosController.listar = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll();
        res.status(200).render('usuarios', {
            data: usuarios
        })
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    };
};

usuariosController.cadastrar = async (req, res) => {
    const {usuarioID, usuarioLogin, usuarioSenha, usuarioFuncMat, usuarioSetor, usuarioStatus} = req.body;

    if (!{usuarioID, usuarioLogin, usuarioSenha, usuarioFuncMat, usuarioSetor, usuarioStatus}) {
        res.status(400).json({message: 'Campos obrigatórios incompletos, preencha todos.' });
        return;
    } else if (await Usuarios.findByPk(usuarioID)){
        res.status(400).json({message: 'Esse usuário já existe. Tente novamente.' });
        return;
    };
    
    try {
        await Usuarios.create({
            usuarioLogin: usuarioLogin,
            usuarioSenha: usuarioSenha,
            usuarioFuncMat: usuarioFuncMat,
            usuarioSetor: usuarioSetor,
            usuarioStatus: usuarioStatus
        });
        res.status(201).redirect('/usuarios');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    };
};

usuariosController.deletar = async (req, res) => {
    const { usuarioID, id } = req.params;

    if (!usuarioID) {
        res.status(404).json({ 'erro': 'Usuário não encontrado' });
        return;
    };

    try {
        await Usuarios.destroy({where: {usuarioID: id}});
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
    const { usuarioID,id } = req.params;
    const { usuarioLogin, usuarioSenha, usuarioFuncMat, usuarioSetor, usuarioStatus } = req.body;

    if (!usuarioID) {
        res.status(404).json({ 'erro': 'Usuário não encontrado!' });
    };
    if(usuarioLogin == usuarioID.usuarioLogin && usuarioSenha == usuarioID.usuarioSenha && usuarioFuncMat == usuarioID.usuarioFuncMat && usuarioSetor == usuarioID.usuarioSetor && usuarioStatus == usuarioID.usuarioStatus){
        res.status(400).json({message: 'Nenhum campo atualizado. Atualize ao menos um campo para salvar as alterações.' });  
        return;
    };
    if(usuarioLogin != usuarioID.usuarioLogin && await Usuarios.findAll({where : {usuarioLogin: usuarioLogin} })){
        res.status(400).json({message: 'Este login já existe, tente novamente.' });  
        return;
    };

    if(usuarioSenha != usuarioID.usuarioSenha && await Usuarios.findAll({where : {usuarioSenha: usuarioSenha} })){
        res.status(400).json({message: 'Senha inválida, tente novamente.' });  
        return;
    };

    try {
        var usuario = await Usuarios.findOne({where: {usuarioID}});
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