import OrdensDeServico from "../models/ordensDeServico.js";
import OsValorPgto from "../utils/osValorPgto.js";
const osController = {};

osController.criarOs = async (req, res) => {
    const data = req.body;

    try{
        await OrdensDeServico.create(data);
    } catch (err) {
        console.log(err);
        res.status(500).json("Erro interno do sistema.");
    }
}

osController.listarOs = async (req, res) => {
    
    try{
        const os = await OrdensDeServico.findAll({include: ['funcionarios', 'clientes', 'veiculos']});
    
        var data = [];
        os.forEach(os => {
            data.push({
                osNum: os.osNum,
                osFuncMat: os.funcionarios.funcMatricula,
                osClienteID: os.clientes.clienteID,
                osVeicPlaca: os.veiculos.veicPlaca,
                osDataRetirada: os.osDataRetirada,
                osDataDevolucao: os.osDataDevolucao,
                osKMRetirada: os.osKMRetirada,
                osKMDevolucao: os.osKMDevolucao,
                osStatus: os.osStatus,
                osValorPgto: os.osValorPgto
            })
        });
    
        res.status(200).json({
            data: data,
            total: data.length
        });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json("Erro interno do sistema.");
    }
}

osController.atualizarOs = async (req, res) => {
    const {osDataDevolucao, osKMDevolucao, osStatus} = req.body;
    const {id} = req.params;

    try{
        var os = await OrdensDeServico.findOne({where: {osNum: id}});
        var valor = await OsValorPgto(os.osKMDevolucao, os.osKMRetirada, ).valor;

        os.set({
            osStatus: osStatus || os.osStatus,
            osKMDevolucao: osKMDevolucao || os.osKMDevolucao,
            osDataDevolucao: osDataDevolucao || os.osDataDevolucao,
            osValorPgto: valor
        });
        await os.save();
        //res.status(201).redirect();

    } catch (err) {
        console.log(err);
        res.status(500).json("Erro interno do sistema.");
    }
}

osController.deletarOs = async (req, res) => {
    const {id} = req.params;

    try {
        await OrdensDeServico.destroy({where: {osNum: id}});
    } catch (err) {
        console.log(err);
        res.status(500).json("Erro interno do sistema.");
    }
}