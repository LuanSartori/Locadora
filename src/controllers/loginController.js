import jwt from 'jsonwebtoken';
import { Usuarios } from '../models/index.js';
const loginController = {};


export function verificaLogin (req, res, next) {
    try {
        if ("jwt_token" in req.cookies) {    
            jwt.verify(req.cookies['jwt_token'], process.env.JWT_SECRET_KEY);
            res.status(403).redirect("/home");
            return;
        }
        next();
    } catch (err) {
        console.log(err);
        if (err instanceof jwt.JsonWebTokenError || err instanceof jwt.TokenExpiredError) {
            res.clearCookie("jwt_token");
        }
        res.status(401).redirect("/login");
    }
}


loginController.login = (req, res) => {
    if(req.query.fail) {
        res.status(200).render('login', {message: "Usuário e/ou senha incorretos!"})
    } else {
        res.status(200).render('login', {message: null});
    }
}


loginController.logar = async (req, res) => {
    const {usuarioLogin, usuarioSenha} = req.body;

    try {
        const usuario = await Usuarios.findOne({where: {usuarioLogin: usuarioLogin}});
        if (!usuario) {
            res.status(401).redirect("/login?fail=true");
            return;
        }

        if (usuarioSenha == usuario.usuarioSenha) {
            const payload = {usuarioID: usuario.usuarioID};
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
            res.cookie("jwt_token", token, { maxAge: 5*60*1000, httpOnly: true }); // 5 minutos
            res.status(200).redirect("/home");
        } else {
            res.status(401).redirect("/login?fail=true");
        }

    } catch (err) {
        console.log(err);
        res.status(500).json("Erro interno do sistema.");
    }
    
};


export default loginController;