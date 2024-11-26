import 'dotenv/config';
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import Usuarios from '../models/usuarios.js';


const opcoes_strategy = {
    jwtFromRequest: (req) => {  
        var token = null;
        if (req && req.cookies) token = req.cookies['jwt_token'];
        return token;
    },
    secretOrKey: process.env.JWT_SECRET_KEY
};

export function passportConfig (passport) {

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

export const requerLogin = passport.authenticate("jwt", { session: false, failureRedirect: "/login" });

export function verificaLogin (req, res, next) {
    if ('jwt_token' in req.cookies) {
        jwt.verify(req.cookies['jwt_token'], process.env.JWT_SECRET_KEY, (err, payload) => {
            if (err) {
                console.log(err);
                if (err instanceof jwt.JsonWebTokenError || err instanceof jwt.TokenExpiredError) res.clearCookie('jwt_token');
                res.status(401).redirect('/login');
            }

            res.status(403).redirect('/');
            return;
        })
    }
    next();
}
