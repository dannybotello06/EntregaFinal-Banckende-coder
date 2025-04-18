import CartRepository from "../repository/cartRepository.js"; 
import TicketRepository from "../repository/ticketRepository.js";
import ProductRepository from "../repository/productRepository.js";


       const cartRepository =  new CartRepository();
       const ticketRepository =  new TicketRepository();
         const productRepository =  new ProductRepository();

        export  const getCartByUserId =  async (req, res) => {
            try {
                const{id}=req.params;
                const cart = await cartRepository.getCartByUserId(id);
                if (!cart) {
                    return res.status(404).json({ msg: "Cart not found" });
                }
                res.status(200).json(cart);
            } catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        }
        export  const createCart = async (req, res) => {
            try {
                const{id}=req.params;
                const cartData = req.body;
                const cart = await cartRepository.createCart({ ...cartData, id });
                res.status(201).json(cart);
            } catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        }
        export  const updateCart = async (req, res) => {
            try {
                const{id}=req.params;
                const cartData = req.body;
                const cart = await cartRepository.updateCart(id, cartData);
                if (!cart) {
                    return res.status(404).json({ msg: "Cart not found" });
                }
                res.status(200).json(cart);
            } catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        }
        export  const deleteCart = async (req, res) => {
            try {
                const{id}=req.params;
                const cart = await cartRepository.deleteCart(userId);
                if (!cart) {
                    return res.status(404).json({ msg: "Cart not found" });
                }
                res.status(200).json(cart);
            } catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        }


        export  const purchaseCart = async (req, res) => {
            try {
                const{id}=req.params;
                const cart = await cartRepository.getCartByUserId(Id);
                if (!cart) {
                    return res.status(404).json({ msg: "Cart not found" });
                }

                let total = 0;
                let productNoStock=[];
                cart.products.forEach(item => {

                    if (item.product.stock< item.quantity) {
                        productNoStock.push(item);
                    }
                    else{
                        total += item.product.price * item.quantity;

                        // Update the product stock
                        item.product.stock -= item.quantity;

                        productRepository.updateProduct(item.product._id, item.product);
                         
                    }
                });
                
                if(total > 0) {

                    var ticket = {
                        purchaser: cart.userId,
                        amount: total,
                        purchase_datetime: new Date(),
                        code: Math.random().toString(36).substring(2, 15)
                    };
                    const ticketfinal = await ticketRepository.createTicket(ticket);
                    const cartfinal = await cartRepository.updateCart(cart.userId,productNoStock);
                    res.status(200).json({ msg: "Purchase successful",noStock: productNoStock });
                }


                else {
                    res.status(400).json({ msg: "No products available for purchase" });
                }
                   

                
            } catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        }