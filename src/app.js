import 'dotenv/config'
import path from 'path';
import morgan from 'morgan';
import express from 'express';
const app = express();


// Variáveis de ambiente
const __dirname = import.meta.dirname;
const PORT = process.env.PORT

// Configurações
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'))); // Arquivos estáticos

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// Configurando o banco de dados
import connection from './config/database.js';
app.use(connection);

// Configurando as rotas
import rotas from './routers/index.js';
rotas(app);

// Iniciando o servidor
app.listen(PORT || 3000, () => {
    console.log(`Servidor online na porta ${PORT || 3000}`);
})
