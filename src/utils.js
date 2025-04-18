import { fileURLToPath } from 'url';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;




export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));


export const isValidPassword = (user, password) => {
    console.log(`Validar dato: user-password: ${user.password}, password: ${password}`);
    return bcrypt.compareSync(password, user.password);
}



export const PRIVATE_KEY = "ENTREGA1FirmaJWT";
export const generateJWToken = (user) => {
    return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '12h' });
};
export const authToken = (req, res, next) => {
    //El JWT token se guarda en los headers de autorización.
    const authHeader = req.headers.authorization;
    console.log("Token present in header auth:");
    console.log(authHeader);
    if (!authHeader) {
        return res.status(401).send({ error: "User not authenticated or missing token." });
    }
    const token = authHeader.split(' ')[1]; //Se hace el split para retirar la palabra Bearer.
    //Validar token
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({ error: "Token invalid, Unauthorized!" });
        //Token OK
        req.user = credentials.user;
        console.log(req.user);
        next();
    });
};



export const passportCall = (strategy) => {

    return async (req, res, next) => {
        console.log("Entrando a llamar la estrategia: ");
     
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
            }

            console.log("Usuario obtenido de la estrategia: ");
            console.log(user);
            req.user = user;

            next()

        })(req, res, next);
    }
}


export const cookieExtractor = req => {
    let token = null;
    console.log("Datos Cookie");
    /*console.log("req", req);*/
    console.log("req.cookies", req.cookies);

    if (req && req.cookies) {
        console.log("Cookies presentes: ");
        token = req.cookies['jwtCookieToken'];
        console.log("Token obtenido desde Cookie:");
        console.log(token);
    }
    return token;
}


export const authorization = (role) => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send("NO AUTORIZADO :Usuario no encontrado  en  JWT");


        if (req.user.role !== role) {
            return res.status(403).send("ERROR : El usuario no tiene permisos con este rol");
        }

        next();
    }
}