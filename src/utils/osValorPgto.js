import OrdensDeServico from "../models/ordensDeServico";
import Categorias from "../models/categorias";
import Veiculos from "../models/veiculos";

export function OsValorPgto(ordem) {
    
    try {
        // var Os = OrdensDeServico.findByPk(osNum);
        var veic = Veiculos.findOne({where: {veicPlaca: ordem.osVeicPlaca}});
        var Cat = Categorias.findOne({where:{catCod: veic.veicCat}});

        const kmDev = ordem.osKMDevolucao;
        const kmRet = ordem.osDataRetirada;
        const cat = Cat.catValor_km;
    
        const km = kmDev - kmRet;

        const valor = km*cat;
        return valor;
    } catch (err) {
        console.log(err);
        res.status(500).json("Erro interno do sistema.");
    }   
}