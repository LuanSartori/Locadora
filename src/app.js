import 'dotenv/config'
import sequelize from "./config/database.js";
import path from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import express from 'express';
const app = express();


// autenticação de usuário
import passport from 'passport';
import {auth, requer_login} from './config/auth.js';
auth(passport)

// Variáveis de ambiente
const __dirname = import.meta.dirname;
const PORT = process.env.PORT

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

// Configurando as rotas
import loginRouter from './routers/loginRouter.js';
import clienteRouter from './routers/clienteRouter.js';
import indexRouter from './routers/index.js'
app.use('/login', loginRouter);
app.use('/clientes', requer_login, clienteRouter);
app.use('/home', requer_login, indexRouter);

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