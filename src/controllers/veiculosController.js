import { Categorias, Combustiveis, Veiculos } from '../models/index.js';
const veiculosController = {};


veiculosController.listar = async (req, res) => {
    try {
        const veiculos = await Veiculos.findAll();
        const combustiveis = await Combustiveis.findAll();
        const categorias = await Categorias.findAll();
        res.status(200).render('veiculos', {
            veiculos: veiculos,
            combustiveis: combustiveis,
            categorias: categorias
        })
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};

veiculosController.cadastrar = async (req, res) => {
    const data = req.body;
    
    try {
        await Veiculos.create(data);
        res.status(201).redirect('/veiculos');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};

veiculosController.deletar = async (req, res) => {
    const { placa } = req.params;

    try {
        await Veiculos.destroy({where: {veicPlaca: placa}});
        res.status(201).redirect('/veiculos');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};

veiculosController.editar = async (req, res) => {
    const { placa } = req.params;

    try {
        const veiculo = await Veiculos.findOne({where: {veicPlaca: placa}});
        res.status(200).render('veiculos_edit', {
            data: veiculo
        })
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};

veiculosController.atualizar = async (req, res) => {
    const { placa } = req.params;
    const data = req.body;
    
    try {
        var veiculo = await Veiculos.findOne({where: {veicPlaca: placa}});
        veiculo.set(data);
        veiculo.save();
        res.status(201).redirect('/veiculos');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};


export default veiculosController;