import 'dotenv/config';
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { Usuarios } from '../models/index.js';


const opcoes_strategy = {
    jwtFromRequest: (req) => {  
        var token = null;
        if (req && req.cookies) token = req.cookies['jwt_token'];
        return token;
    },
    secretOrKey: process.env.JWT_SECRET_KEY
};


export function auth (passport) {

    passport.serializeUser( (user, done) => {
        done(null, user);
    } );

    passport.deserializeUser( (user, done) => {
        done(null, user);
    } )

    passport.use(new JwtStrategy(
            opcoes_strategy,
            async ( jwt_payload, done ) => {
                try {
                    const user = Usuarios.findByPk(jwt_payload.usuarioID);
                    
                    if (user) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
    
                } catch (err) {
                    done(err, false);
                }
            }
        )
    );

}


export const requer_login = passport.authenticate("jwt", { session: false, failureRedirect: "/login" });