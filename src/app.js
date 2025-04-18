import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import __dirname from './utils.js';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import initializePassport from './config/passport.config.js';


import sessionsRouter from './router/session.router.js'
import userViewRouter from './router/user.view.router.js'; 

import productRouter from './router/product.router.js';
import cartRouter from './router/cart.router.js';
import dotenv from 'dotenv'


const app = express();
dotenv.config() 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use(cookieParser("CoderS3cr3tC0d3"));

app.use(session({
    
    store: MongoStore.create({ 
        mongoUrl: process.env.URL_MONGODB,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
ttl:60}),
secret: process.env.SECRET_SESSION,
resave: false,
saveUninitialized: false,
}));


// Connect to MongoDB
const urlMongo = process.env.URL_MONGODB
const connectMongoDB = async () => {
    try {
        await mongoose.connect(urlMongo);
        console.log("Conectado con exito a MongoDB ");
    } catch (error) {
        console.error("No se pudo conectar a la BD " + error);
        process.exit();
    }
};
connectMongoDB();

// Initialize passport  
initializePassport(passport);
app.use(passport.initialize());  


const SERVER_PORT = process.env.SERVER_PORT
app.listen(SERVER_PORT, () => {
    console.log("Servidor puerto " + SERVER_PORT);
});



app.use("/users", userViewRouter); 
app.use("/api/sessions", sessionsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);