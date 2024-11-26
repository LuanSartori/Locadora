import 'dotenv/config';
import sequelize from "./config/database.js";
import path from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { passportConfig } from './config/auth.js';
import express from 'express';
const app = express();


// VARIÁVEIS DE AMBIENTE
const __dirname = import.meta.dirname || path.dirname(process.argv[1]);
const PORT = process.env.PORT;

// CONFIGURAÇÕES
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'))); // Arquivos estáticos

// MIDDLEWAReS
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());
passportConfig(passport);

// CONFIGURA AS ROTAS
import rotas from "./routes/index.js"
rotas(app);

// Sincroniza o banco de dados e inicia o servidor
const startServer = async () => {
    try {
        await sequelize.sync(); // Isso cria as tabelas se elas não existirem
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao iniciar o servidor:", error);
    }
};
  
startServer();