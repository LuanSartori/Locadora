import homeRouter from './homeRouter.js';
import loginRouter from './loginRouter.js';
import clientesRouter from './clientesRouter.js';
import usuariosRouter from './usuariosRouter.js';
import funcionariosRouter from './funcionariosRouter.js';
import veiculosRouter from './veiculosRouter.js';

import { requerLogin, verificaLogin } from '../config/auth.js';


// função que indexa todas as pastas de rotas
export default function(app) {
    app.use('/login', verificaLogin, loginRouter);
    app.use('/clientes', requerLogin, clientesRouter);
    app.use('/usuarios', requerLogin, usuariosRouter);
    app.use('/funcionarios', requerLogin, funcionariosRouter);
    app.use('/veiculos', requerLogin, veiculosRouter);
    app.use('/', requerLogin, homeRouter);
}
