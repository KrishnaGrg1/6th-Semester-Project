import mongoose, { Schema, model } from "mongoose";


const currencySchema=new Schema({
    name:{
        type:String,
        required:true
    },
    exchangeRate:{
        type:Number,
        required:true
    },
    foundIn:{
        type:Date,
        required:true
    }
})

const mainSchema=new Schema({
    date:{
        type:Date,
        required:true,
        default:"2019"
    },
    source:{
        type:String,
        required:true
    },
    updatedBy:{
        type:String,
        required:true
    },
    currencies:{
        type:[currencySchema],
        required:true,
    }
})




const Model=mongoose.model("Currencies",mainSchema);


export default Model


