import Product from "../models/product.model.js";
export default class ProductDao {




  async getById(productId) {
    console.log("Fetching product by ID:", productId);
    return await Product.findById(productId);
  }

  async getByProductId(productId) {
    return await Product.findOne({ product_id: productId });
  }


  async getAll() {
    return await Product.find();
  }

  async create(productData) {
    const product = new Product(productData);
    return await product.save();
  }

  async update(productId, productData) {
    return await Product.findByIdAndUpdate(productId, productData, { new: true });
  }

  async delete(productId) {
    return await Product.findByIdAndDelete(productId);
  }
}

