import express from 'express';
import clienteRouter from '../routers/clienteRouter.js';


// define uma rota padrão
const router = express.Router();
router.get("/", function (req, res) {
    res.json("BOM DIAA!");
    // res.redirect("/");
});


// função que indexa todas as pastas de rotas
export default function(app) {
    app.use("/", router);
    app.use("/clientes", clienteRouter);
}
