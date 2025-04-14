import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    proname: String,
    probrand: String,
    procategory: String,
    proprice:Number,
    prodesc:String,
    imageUrl:{
    type:String,
    publicid:String
    }
  })

const Product=mongoose.models.ProductModel || mongoose.model("ProductModel",ProductSchema);

export default Product;