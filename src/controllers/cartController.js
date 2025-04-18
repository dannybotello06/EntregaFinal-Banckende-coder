import CartRepository from "../repository/cartRepository.js"; 




       const cartRepository =  new CartRepository();

        export  const getCartByUserId =  async (req, res) => {
            try {
                const userId = req.user._id;
                const cart = await cartRepository.getCartByUserId(userId);
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
                const userId = req.user._id;
                const cartData = req.body;
                const cart = await cartRepository.createCart({ ...cartData, userId });
                res.status(201).json(cart);
            } catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        }
        export  const updateCart = async (req, res) => {
            try {
                const userId = req.user._id;
                const cartData = req.body;
                const cart = await cartRepository.updateCart(userId, cartData);
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
                const userId = req.user._id;
                const cart = await cartRepository.deleteCart(userId);
                if (!cart) {
                    return res.status(404).json({ msg: "Cart not found" });
                }
                res.status(200).json(cart);
            } catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        }