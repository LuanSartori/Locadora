import Clientes from "../models/clientes.js";
import Funcionarios from "../models/funcionarios.js";
import OrdensDeServico from "../models/ordensDeServico.js";
import Veiculos from "../models/veiculos.js";
import { OsValorPgto } from "../utils/osValorPgto.js";
const osController = {};


osController.criarOs = async (req, res) => {
    const {osFuncMat, osVeicPlaca, osClienteID, osDataRetirada, osKMRetirada} = req.body;

    try{
        await OrdensDeServico.create({
            osFuncMat: osFuncMat,
            osClienteID: osClienteID,
            osVeicPlaca: osVeicPlaca,
            osDataRetirada: osDataRetirada,
            osDataDevolucao: null,
            osKMRetirada: osKMRetirada,
            osKMDevolucao: null,
            osValorPgto: null
        });
        res.status(201).redirect('/ordensdeservico');
    } catch (err) {
        console.log(err);
        res.status(500).json("Erro interno do sistema.");
    }
}

osController.listarOs = async (req, res) => {
    
    try{
        const os = await OrdensDeServico.findAll({include: ['funcionario', 'cliente', 'veiculo']});
        const funcionarios = await Funcionarios.findAll({attributes: ['funcMatricula', 'funcNome']});
        const clientes = await Clientes.findAll({attributes: ['clienteID', 'clienteNome']});
        const veiculos = await Veiculos.findAll({attributes: ['veicPlaca']});
    
        var data = [];
        os.forEach(os => {
            data.push({
                osNum: os.osNum,
                osFuncMat: os.funcionario.funcMatricula,
                osClienteID: os.cliente.clienteID,
                osVeicPlaca: os.veiculo.veicPlaca,
                osDataRetirada: os.osDataRetirada,
                osDataDevolucao: os.osDataDevolucao,
                osKMRetirada: os.osKMRetirada,
                osKMDevolucao: os.osKMDevolucao,
                osStatus: os.osStatus,
                osValorPgto: os.osValorPgto,
                funcionario: os.funcionario,
                cliente: os.cliente,
                veiculo: os.veiculo
            })
        });
    
        res.status(200).render('ordensdeservico', {
            ordens: data,
            total: data.length,
            funcionarios: funcionarios,
            clientes: clientes,
            veiculos: veiculos
        });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json("Erro interno do sistema.");
    }
}

osController.buscarOrdem = async (req, res) => {
    const { osNum } = req.query;

    try {
        const ordem = await OrdensDeServico.findByPk(osNum);
        if (!ordem) {
            res.status(400).json({ erro: "Ordem não encontrada."});
            return;
        }
        res.status(200).json(ordem);
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/');
    }
};

osController.atualizarOs = async (req, res) => {
    const {osDataDevolucao, osKMDevolucao, osStatus} = req.body;
    const {id} = req.params;

    try{
        var os = await OrdensDeServico.findOne({where: {osNum: id}});
        var valor = OsValorPgto(os);

        os.set({
            osStatus: osStatus == undefined ? false : true,
            osKMDevolucao: osKMDevolucao || os.osKMDevolucao,
            osDataDevolucao: osDataDevolucao || os.osDataDevolucao,
            osValorPgto: valor
        });
        await os.save();
        res.status(201).redirect('/ordensdeservico');

    } catch (err) {
        console.log(err);
        res.status(500).json("Erro interno do sistema.");
    }
}

osController.deletarOs = async (req, res) => {
    const {id} = req.params;

    try {
        await OrdensDeServico.destroy({where: {osNum: id}});
        res.status(201).redirect('/ordensdeservico');
    } catch (err) {
        console.log(err);
        res.status(500).json("Erro interno do sistema.");
    }
}


export default osController;