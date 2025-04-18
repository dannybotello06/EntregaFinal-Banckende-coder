import mongoose from "mongoose"
import paginate from "mongoose-paginate-v2";

const productSchema= new mongoose.Schema({

    title: { 
        type:String,
        required: true
    },
    description: { 
        type:String,
        required: true
    },
    code: { 
        type:String,
        required: true
    },
    stock: { 
        type:Number,
        required: true
    },
    price: { 
        type:Number,
        required: true
    },
    status:  { 
        type:Boolean,
        required: true
    },
    category:  { 
        type:String,
        required: true
    },
    thumbnail:  { 
        type:String,
        required: true
    },
  });

  productSchema.plugin(paginate);


    const Product = mongoose.model("Product",productSchema);


    export default Product;