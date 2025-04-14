
import mongoose from "mongoose";

const options = {
useNewUrlParser: true,
useUnifiedTopology: true,
};


const dbConnect = async () => {
const connectionurl="mongodb://127.0.0.1:27017/nextjsday6"
mongoose.connect(connectionurl, options).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
})
mongoose.set("strictQuery", false);
}


export default dbConnect