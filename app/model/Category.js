import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema({
    category: String
  })

const CategoryModel=mongoose.models.Category || mongoose.model("Category",CategorySchema);

export default CategoryModel;