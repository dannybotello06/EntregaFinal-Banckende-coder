import express from "express"
import {getProducts,getProductID,deleteProduct,saveProduct,updateProduct}from "../controllers/productController.js"
import {authorize}  from "../middleware/middlewares.js";
import cookieParser from 'cookie-parser';

const productRouter = express.Router();




productRouter.get("/:id",getProductID)  
productRouter.get("/",getProducts)
productRouter.post("/",authorize("admin"),saveProduct)
productRouter.put("/:id",authorize("admin"),updateProduct)
productRouter.delete("/:id",authorize("admin"),deleteProduct)

export default productRouter