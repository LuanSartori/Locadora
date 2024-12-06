import Categorias from "../models/categorias.js";
import Combustiveis from "../models/combustiveis.js";
import Veiculos from "../models/veiculos.js";
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

veiculosController.buscarVeiculo = async (req, res) => {
    const { veicPlaca } = req.query;

    try {
        const veiculo = await Veiculos.findByPk(veicPlaca);
        if (!veiculo) {
            res.status(400).json({ erro: "Veículo não encontrado. "});
            return;
        }
        res.status(200).json(veiculo);
        return;
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};

veiculosController.cadastrar = async (req, res) => {
    const { veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado } = req.body;

    try {
        if (!veicMarca || !veicModelo || !veicCor || !veicAno || !veicComb || !veicCat || !veicStatusAlocado) {
            res.status(400).json({message: 'Campos obrigatórios incompletos, preencha todos.' });
            return;
        } else if (await Veiculos.findByPk(veicPlaca)){
            res.status(400).json({message: 'Veículo já cadastrado. Tente novamente.' });
            return;
        };

        await Veiculos.create({
            veicPlaca: veicPlaca,
            veicMarca: veicMarca,
            veicModelo: veicModelo,
            veicCor: veicCor,
            veicAno: veicAno,
            veicComb: veicComb,
            veicCat: veicCat,
            veicStatusAlocado: veicStatusAlocado
        });
        res.status(201).redirect('/veiculos');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};

veiculosController.deletar = async (req, res) => {
    const { placa } = req.params;

    try {
        const veiculo = await Veiculos.findByPk(placa);
        if (!veiculo) {
            res.status(404).json({ 'erro': 'Veículo não encontrado!' });
            return;
        };
        veiculo.destroy();
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
    const { veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado } = req.body;

    try {
        var veiculo = await Veiculos.findByPk(placa);
        if (!veiculo) {
            res.status(404).json({ 'erro': 'Veículo não encontrado!' });
            return;
        } else if(veicMarca == veiculo.veicMarca && veicModelo == veiculo.veicModelo && veicCor == veiculo.veicCor && veicAno == veiculo.veicAno && veicComb == veiculo.veicComb && veicCat == veiculo.veicCat && veicStatusAlocado == veiculo.veicStatusAlocado){
            res.status(400).json({message: 'Nenhum campo atualizado. Atualize ao menos um campo para salvar as alterações.' });
            return;
        };

        veiculo.set({
            veicMarca: veicMarca || veiculo.veicMarca,
            veicModelo: veicModelo || veiculo.veicModelo,
            veicCor: veicCor || veiculo.veicCor,
            veicAno: veicAno || veiculo.veicAno,
            veicComb: veicComb || veiculo.veicComb,
            veicCat: veicCat || veiculo.veicCat,
            veicStatusAlocado: veicStatusAlocado == undefined ? false : true
        });
        await veiculo.save();
        res.status(201).redirect('/veiculos');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};


export default veiculosController;