const mongoose=require('mongoose');

const ModelSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})


const URL=mongoose.Schema('URL',ModelSchema);

module.exports=URL;