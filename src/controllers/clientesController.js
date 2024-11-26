import Categorias from "../models/categorias.js";
import Clientes from "../models/clientes.js";
const clientesController = {};


clientesController.listar = async (req, res) => {
    try {
        const clientes = await Clientes.findAll();
        const categorias = await Categorias.findAll();
        res.status(200).render('clientes', {
            clientes: clientes,
            categorias: categorias
        })
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};

clientesController.cadastrar = async (req, res) => {
    const data = req.body;
    
    try {
        await Clientes.create(data);
        res.status(201).redirect('/clientes');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};

clientesController.deletar = async (req, res) => {
    const { id } = req.params;

    try {
        await Clientes.destroy({where: {clienteID: id}});
        res.status(201).redirect('/clientes');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};

clientesController.editar = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Clientes.findOne({where: {clienteID: id}});
        res.status(200).render('clientes_edit', {
            data: usuario
        })
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};

clientesController.atualizar = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    
    try {
        var cliente = await Clientes.findOne({where: {clienteID: id}});
        cliente.set(data)
        cliente.save();
        res.status(201).redirect('/clientes');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};


export default clientesController;