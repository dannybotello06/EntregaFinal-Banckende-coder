import passport from 'passport';
import passportLocal from 'passport-local';
import jwtStrategy from 'passport-jwt';


import userModel from '../services/models/user.model.js';
import { createHash, PRIVATE_KEY, cookieExtractor } from '../utils.js'




const localStrategy = passportLocal.Strategy;

const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;



const initializePassport = () => {

    passport.use('jwt', new JwtStrategy(
        {
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: PRIVATE_KEY
        }, async (jwt_payload, done) => {
            console.log("Entrando a passport a la estrategia  en JWT.");
            try {
                console.log("JWT obtenido del payload");
                console.log(jwt_payload);
                return done(null, jwt_payload.user);
            } catch (error) {
                console.error(error);
                return done(error);
            }
        }
    ));

    passport.use('login', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username });
                console.log("Usuario encontrado para login:");
                console.log(user);
                if (!user) {
                    console.warn("User doesn't exists with username: " + username);
                    return done(null, false);
                }
                if (!isValidPassword(user, password)) {
                    console.warn("Invalid credentials for user: " + username);
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
    );


    passport.use('register', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {

            console.log("userModel", username);

            const { first_name, last_name, email, age } = req.body;
            try {
                const exists = await userModel.findOne({ email: username });
                if (exists) {
                  /*  console.log("El usuario ya existe.");*/
                    return done(null, false);
                }
                const user = {
                    first_name,
                    last_name,
                    username,
                    email,
                    age,
                    password: createHash(password),
                    loggedBy: "App"
                };
                const result = await userModel.create(user);
                return done(null, result);
            } catch (error) {
                return done("Error registrando el usuario: " + error);
            }
        }
    ));



    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    });

}



export default initializePassport;