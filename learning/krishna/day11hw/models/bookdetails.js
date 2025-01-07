
import mongoose, {model, Schema } from "mongoose";


const bookSchema=new Schema({
title:{
    type:String,
    required:true
},
author:{
    type:String,
    required:true
},
publishedYear:{
    type:Date,
    required:true
},
genre:{
    type:String,
    required:true
},
rating:{
    type:Number,
    required:true
}
} ,{ timestamps: true })

const Book=model("Book",bookSchema);



export{
    Book
}