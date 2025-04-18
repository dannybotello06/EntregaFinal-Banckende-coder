import express from "express"
import {getProducts,getProductID,deleteProduct,saveProduct,updateProduct}from "../controllers/productController.js"
import Middlewares from "../middleware/middlewares.js";
import cookieParser from 'cookie-parser';

const productRouter = express.Router();
productRouter.use(cookieParser("CoderS3cr3tC0d3"));

function auth(req, res, next){
console.log(req.session.user)


    if (req.session.user && req.session.admin) {
        return next();
    } else{
        return res.status(403).send("Usuario no autorizado para ingresar a este recurso.");
    }
}


productRouter.get("/:id",auth,getProductID)  
productRouter.get("/",getProducts)
productRouter.post("/",auth,saveProduct)
productRouter.put("/:id",auth,updateProduct)
productRouter.delete("/:id",auth,deleteProduct)

export default productRouter