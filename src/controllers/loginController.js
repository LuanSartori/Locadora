import jwt from 'jsonwebtoken';
import { Usuarios } from '../models/index.js';
const loginController = {};


loginController.login = (req, res) => {
    if(req.query.fail) {
        res.render('login', {message: "Usuário e/ou senha incorretos!"})
    } else {
        res.render('login', {message: null});
    }
}


loginController.logar = async (req, res) => {
    const {usuarioLogin, usuarioSenha} = req.body;

    try {
        const usuario = await Usuarios.findOne({where: {usuarioLogin: usuarioLogin}});
        if (!usuario) {
            res.redirect("/login?fail=true");
            return;
        }

        if (usuarioSenha == usuario.usuarioSenha) {
            const payload = {usuarioID: usuario.usuarioID};
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
            res.cookie("jwt_token", token, { maxAge: 5*60*1000, httpOnly: true }); // 5 minutos
            res.redirect("/home");
        } else {
            res.redirect("/login?fail=true");
        }

    } catch (err) {
        console.log(err);
        res.status(500).json("Erro interno do sistema.");
    }
    
};


export default loginController;