import bcrypt from 'bcryptjs';
import {Strategy as LocalStrategy} from 'passport-local';
import connection from './config/database.js';


export default function (passport) {

    function findUser(username) {
        connection.connect(
            (err) => {
                if (err) throw err;
                connection.query('SELECT * FROM usuarios WHERE usuarioLogin=?', [username], (err, cliente) => {
                    console.log('procurou:')
                    console.log(cliente);
                    return cliente;
                })
            }
        )
    }

    passport.serializeUser( (user, done) => {
        done(null, user.usuarioLogin);
    } );

    passport.deserializeUser( (username, done) => {
        try {
            const user = findUser(username);
            done(null, user);
        } catch (err) {
            console.log(err);
            return done(err, null);
        }
    });

    passport.use(new LocalStrategy( {
        usernameField: 'usuarioLogin',
        passwordField: 'usuarioSenha'
    },
    (username, password, done) => {
        try {
            const user = findUser(username);
            if (!user) return done(null, false);

            const isValid = (password == user.usuarioSenha);
            if (!isValid) return done(null, false);
            return done(null, user);

        } catch (err) {
            console.log(err);
            done(err, false);
        }
    } ))

}