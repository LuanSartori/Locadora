import express from 'express';
const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).render('home');
})


export default router;


// função que indexa todas as pastas de rotas
// export default function(app) {
//     app.use("/login", loginRouter)
//     app.use("/clientes", clienteRouter);
//     app.use("/", (req, res) => {
//         res.render('home');
//     });
// }
