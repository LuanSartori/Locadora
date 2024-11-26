import jwt from 'jsonwebtoken';
import Funcionarios from '../models/funcionarios.js';
import Usuarios from '../models/usuarios.js';
const loginController = {};


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
        const usuario = await Usuarios.findOne({where: {usuarioLogin: usuarioLogin}, include: Funcionarios});
        if (!usuario) {
            res.status(401).redirect("/login?fail=true");
            return;
        }

        if (usuarioSenha == usuario.usuarioSenha) {
            const payload = {
                usuarioID: usuario.usuarioID,
                usuarioNome: usuario.Funcionario.funcNome
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
            res.cookie("jwt_token", token, { maxAge: 60*60*1000, httpOnly: true }); // 1 hora
            res.status(200).redirect("/");
        } else {
            res.status(401).redirect("/login?fail=true");
        }

    } catch (err) {
        console.log(err);
        res.status(500).json("Erro interno do sistema.");
    }
    
};


export default loginController;