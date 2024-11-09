import 'dotenv/config'
import path from 'path';
import morgan from 'morgan';
import express from 'express';
const app = express();

// autenticação de usuário
import passport from 'passport';
import session from 'express-session';
import auth from './auth.js';
auth(passport)

function authenticationMiddleware(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
};

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
app.use(session({
    secret: 'capybara',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 } // 30 minutos
}))
app.use(passport.initialize());
app.use(passport.session());

// Configurando o banco de dados
import connection from './config/database.js';
app.use(connection);

// Configurando as rotas
import loginRouter from './routers/loginRouter.js';
import clienteRouter from './routers/clienteRouter.js';
import indexRouter from './routers/index.js'
app.use('/login', loginRouter);
app.use('/clientes', authenticationMiddleware, clienteRouter);
app.use('/', authenticationMiddleware, indexRouter);

// Iniciando o servidor
app.listen(PORT || 3000, () => {
    console.log(`Servidor online na porta ${PORT || 3000}`);
})
