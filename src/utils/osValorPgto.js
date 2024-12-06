import Categorias from "../models/categorias.js";
import Veiculos from "../models/veiculos.js";

export async function OsValorPgto(ordem) {
    
    try {
        var veic = await Veiculos.findOne({where: {veicPlaca: ordem.osVeicPlaca}});
        var Cat = await Categorias.findOne({where:{catCod: veic.veicCat}});

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