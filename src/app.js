import 'dotenv/config';
import sequelize from "./config/database.js";
import path from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { passportConfig, requerLogin, verificaLogin } from './config/auth.js';
import express from 'express';
const app = express();


// Variáveis de ambiente
const __dirname = import.meta.dirname;
const PORT = process.env.PORT;

// Configurações
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'))); // Arquivos estáticos

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());
passportConfig(passport);

// Configurando as rotas
import loginRouter from './routes/loginRouter.js';
import clientesRouter from './routes/clientesRouter.js';
import usuariosRouter from './routes/usuariosRouter.js'
import funcionariosRouter from './routes/funcionariosRouter.js'
import veiculosRouter from './routes/veiculosRouter.js'
import indexRouter from './routes/index.js';
app.use('/login', verificaLogin, loginRouter);
app.use('/clientes', requerLogin, clientesRouter);
app.use('/usuarios', requerLogin, usuariosRouter);
app.use('/funcionarios', requerLogin, funcionariosRouter);
app.use('/veiculos', requerLogin, veiculosRouter);
app.use('/', requerLogin, indexRouter);

// Sincroniza o banco de dados e inicia o servidor
const startServer = async () => {
    try {
        await sequelize.sync(); // Isso cria as tabelas se elas não existirem
        app.listen(PORT, () => {
            console.log("Servidor rodando na porta 3000");
        });
    } catch (error) {
        console.error("Erro ao iniciar o servidor:", error);
    }
};
  
startServer();