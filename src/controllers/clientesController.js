import Categorias from "../models/categorias.js";
import Clientes from "../models/clientes.js";
const clientesController = {};


clientesController.listar = async (req, res) => {
    try {
        const clientes = await Clientes.findAll();
        const categorias = await Categorias.findAll();
        res.status(200).render('clientes_lista', {
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

    // TODO: Validações
    
    try {
        await Clientes.create({
            clienteCPF: data.clienteCPF,
            clienteNome: data.clienteNome,
            clienteEnde: data.clienteEnde,
            clienteTel: data.clienteTel,
            clienteCidade: data.clienteCidade,
            clienteDataNasc: data.clienteDataNasc,
            clienteCNH: data.clienteCNH,
            clienteCNHCat: data.clienteCNHCat
        });
        res.status(201).redirect('/clientes');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/clientes');
    }
};

clientesController.deletar = async (req, res) => {
    const { id } = req.params;

    // TODO: Verificar permissão

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
    const { clienteCPF, clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH, clienteCNHCat } = req.body;

    // TODO: Validações
    
    try {
        var cliente = await Clientes.findOne({where: {clienteID: id}});
        cliente.set({
            clienteCPF: clienteCPF || cliente.clienteCPF,
            clienteNome: clienteNome || cliente.clienteNome,
            clienteEnde: clienteEnde || cliente.clienteEnde,
            clienteTel: clienteTel || cliente.clienteTel,
            clienteCidade: clienteCidade || cliente.clienteCidade,
            clienteDataNasc: clienteDataNasc || cliente.clienteDataNasc,
            clienteCNH: clienteCNH || cliente.clienteCNH,
            clienteCNHCat: clienteCNHCat || cliente.clienteCNHCat
        });
        await cliente.save();

        res.status(201).redirect('/clientes');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};


export default clientesController;
