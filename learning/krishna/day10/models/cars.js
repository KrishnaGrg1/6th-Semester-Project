import { model, Schema } from "mongoose";

const carSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        default: 100000,
    },
    manufacturer: {
        type: String,
        required: true,
    },
    makeYear: {
        type: Date,
        required: true,
    }
}, { timestamps: true })

const Car = model("Car", carSchema);




export default Car;