import productDao from "../services/daos/productDao.js";


export default  class ProductRepository {


 productDao = new productDao();



    async getProductById(productId) {
    return await this.productDao.getById(productId);
  }

  async getProductByProductId(productId) {
    return await this.productDao.getByProductId(productId);
  }

  async getAllProducts() {
    return await this.productDao.getAll();
  }

  getAllProductsQuery() {
    return this.productDao.getAllQuery();
  }

  async createProduct(productData) {
    return await this.productDao.create(productData);
  }

  async updateProduct(productId, productData) {
    return await this.productDao.update(productId, productData);
  }

  async deleteProduct(productId) {
    return await this.productDao.delete(productId);
  }
}

