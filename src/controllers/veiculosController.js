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

veiculosController.cadastrar = async (req, res) => {
    const { veicPlaca } = req.body;
    const {veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado} = req.body;

    if (!{veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado}) {
        res.status(400).json({message: 'Campos obrigatórios incompletos, preencha todos.' });
        return;
    } else if (await Funcionarios.findByPk(veicPlaca)){
        res.status(400).json({message: 'Veículo já cadastrado. Tente novamente.' });
        return;
    };
    
    try {
        await Veiculos.create({
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
    const { veicPlaca } = req.params;

    if (!veicPlaca) {
        res.status(404).json({ 'erro': 'Veículo não encontrado!' });
        return;
    };

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
    const { veicPlaca } = req.params;
    const { veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado } = req.body;

    if (!veicPlaca) {
        res.status(404).json({ 'erro': 'Veículo não encontrado!' });
    };
    if(veicMarca == veicPlaca.veicMarca && veicModelo == veicPlaca.veicModelo && veicCor == veicPlaca.veicCor && veicAno == veicPlaca.veicAno && veicComb == veicPlaca.veicComb && veicCat == veicPlaca.veicCat && veicStatusAlocado == veicPlaca.veicStatusAlocado){
        res.status(400).json({message: 'Nenhum campo atualizado. Atualize ao menos um campo para salvar as alterações.' });
        return;
    };

    try {
        var veiculo = await Veiculos.findOne({where: {veicPlaca: placa}});
        veiculo.set({
            veicMarca: veicMarca || veiculo.veicMarca,
            veicModelo: veicModelo || veiculo.veicModelo,
            veicCor: veicCor || veiculo.veicCor,
            veicAno: veicAno || veiculo.veicAno,
            veicComb: veicComb || veiculo.veicComb,
            veicCat: veicCat || veiculo.veicCat,
            veicStatusAlocado: veicStatusAlocado || veiculo.veicStatusAlocado
        });
        await veiculo.save();
        res.status(201).redirect('/veiculos');
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};


export default veiculosController;