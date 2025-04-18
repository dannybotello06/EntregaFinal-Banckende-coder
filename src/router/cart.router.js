import express from "express"
import {createCart,deleteCart, updateCart,getCartByUserId,purchaseCart }from "../controllers/cartController.js"




const cartRouter = express.Router();

cartRouter.get("/:id",getCartByUserId)
cartRouter.post("",createCart)
cartRouter.put("/:id",updateCart)
cartRouter.delete("/:id",deleteCart)
cartRouter.post("/purchase/:id", purchaseCart );
export default cartRouter