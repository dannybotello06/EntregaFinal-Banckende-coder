import express from "express"
import {createCart,deleteCart, updateCart,getCartByUserId }from "../controllers/cartController.js"




const cartRouter = express.Router();

cartRouter.get("/",getCartByUserId)
cartRouter.post("/",createCart)
cartRouter.put("/",updateCart)
cartRouter.delete("/",deleteCart)
export default cartRouter