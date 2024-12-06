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
    const {clienteCPF, clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH, clienteCNHCat} = req.body;

    if (!{clienteCPF, clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH, clienteCNHCat}) {
        res.status(400).json({message: 'Campos obrigatórios incompletos, preencha todos.' });
        return;
    } else if (await Clientes.findByPk(clienteID)){
        res.status(400).json({message: 'Cliente já cadastrado. Tente novamente.' });
        return;
    };
    
    try {
        await Clientes.create({
            clienteCPF: clienteCPF,
            clienteNome: clienteNome,
            clienteEnde: clienteEnde,
            clienteTel: clienteTel,
            clienteCidade: clienteCidade,
            clienteDataNasc: clienteDataNasc,
            clienteCNH: clienteCNH,
            clienteCNHCat: clienteCNHCat
        });
        res.status(201).redirect('/clientes');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/clientes');
    }
};

clientesController.deletar = async (req, res) => {
    const { id } = req.params;

    if (!{clienteCPF, clienteID}) {
        res.status(404).json({ 'erro': 'Cliente não encontrado!' });
        return;
    };

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
    const { clienteID, id } = req.params;
    const { clienteCPF, clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH, clienteCNHCat } = req.body;

    if (!clienteID) {
        res.status(404).json({ 'erro': 'Cliente não encontrado!' });
    };
    if(clienteCPF == clienteID.clienteCPF && clienteNome == clienteID.clienteNome && clienteEnde == clienteID.clienteEnde && clienteTel == clienteID.clienteTel && clienteCidade == clienteID.clienteCidade && clienteDataNasc == clienteID.clienteDataNasc && clienteCNH == clienteID.clienteCNH && clienteCNHCat == clienteID.clienteCNHCat){
        res.status(400).json({message: 'Nenhum campo atualizado. Atualize ao menos um campo para salvar as alterações.' });
        return;
    };
    if(clienteCPF != clienteID.clienteCPF && await Clientes.findAll({where : {clienteCPF: clienteCPF} })){
        res.status(400).json({message: 'CPF inválido, tente novamente.' });  
        return;
    };

    try {
        var cliente = await Clientes.findOne({where: {clienteID}});
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
