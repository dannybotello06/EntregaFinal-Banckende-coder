import cartDao from "../services/daos/cartDao.js";


export default  class CartRepository {


    cartDao = new cartDao();


    async getCartByUserId(userId) {
        return await this.cartDao.getByUserId(userId);
    }
    async createCart(cartData) {
        return await this.cartDao.createCart(cartData);
    }
    async updateCart(userId, cartData) {
        return await this.cartDao.updateCart(userId, cartData);
    }
    async deleteCart(userId) {
        return await this.cartDao.deleteCart(userId);
    }


}