import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
  })

const User=mongoose.models.UserModel || mongoose.model("UserModel",UserSchema);

export default User;