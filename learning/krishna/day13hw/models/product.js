
import { Schema, model } from "mongoose";

const productSchema=new Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    stockQuantity: {
        type: Number,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,  // Make sure this is an ObjectId
        ref: 'User',  // Reference the User model
        required: true
    }
})


const Product=model("Product",productSchema);

export default Product





