import bcrypt from 'bcryptjs';
import {Strategy as LocalStrategy} from 'passport-local';
import { Usuarios } from './models/index.js';


async function findUser(username) {
    try {
        const user = await Usuarios.findOne({ where: { usuarioLogin: username } });
        return user;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export default function (passport) {

    passport.serializeUser( (user, done) => {
        done(null, user);
    } );

    passport.deserializeUser( (user, done) => {
        done(null, user);
    } )

    passport.use(new LocalStrategy( {
        usernameField: 'usuarioLogin',
        passwordField: 'usuarioSenha'
    },
    async (username, password, done) => {
        try {
            const user = await findUser(username);
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