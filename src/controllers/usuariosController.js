import { Usuarios } from '../models/index.js';
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
    }
};

usuariosController.cadastrar = async (req, res) => {
    const data = req.body;
    
    try {
        await Usuarios.create(data);
        res.status(201).redirect('/usuarios');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};

usuariosController.deletar = async (req, res) => {
    const { id } = req.params;

    try {
        await Usuarios.destroy({where: {usuarioID: id}});
        res.status(201).redirect('/usuarios');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
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
    }
};

usuariosController.atualizar = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    
    try {
        var usuario = await Usuarios.findOne({where: {usuarioID: id}});
        usuario.set(data);
        usuario.save();
        res.status(201).redirect('/usuarios');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};


export default usuariosController;