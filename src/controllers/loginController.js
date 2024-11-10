const loginController = {};
import { Usuarios, OrdensDeServico } from '../models/index.js';


loginController.login = (req, res) => {
    if(req.query.fail) {
        res.render('login', {message: "Usuário e/ou senha incorretos!"})
    } else {
        res.render('login', {message: null});
    }
}


loginController.logar = (req, res) => {
    const {usuarioLogin, usuarioSenha} = req.body;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios WHERE usuarioLogin=? AND usuarioSenha=?', [usuarioLogin, usuarioSenha], (err, cliente) => {
            if (err) {
                res.json(err);
            }

            if (cliente) {
                res.redirect('/')
            } else {
                res.redirect('/login?fail=true')
            }
        });
    });
    
};


export default loginController;