import OrdensDeServico from "../models/ordensDeServico";
import Categorias from "../models/categorias";
import Veiculos from "../models/veiculos";

export function OsValorPgto(kmDev, kmRet, cat) {
    const {osNum} = req.params;
    
    try {
        var Os = OrdensDeServico.findByPk(osNum);
        var veic = Veiculos.findOne({where: {veicPlaca: Os.osVeicPlaca}});
        var Cat = Categorias.findOne({where:{catCod: veic.veicCat}});

        const kmDev = Os.osKMDevolucao;
        const kmRet = Os.osDataRetirada;
        const cat = Cat.catValor_km;
    
        const km = kmDev - kmRet;

        const valor = km*cat;
        return valor;
    } catch (err) {
        console.log(err);
        res.status(500).json("Erro interno do sistema.");
    }   
}