
import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price:{
        type:Number,
        required:true
     },
     category:{
        type:String,
       
     }
    })
 const product = mongoose.model("product", productSchema);

export default product;