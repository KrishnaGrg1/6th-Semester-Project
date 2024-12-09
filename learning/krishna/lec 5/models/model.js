const mongoose=require('mongoose');

const URLSchema=new mongoose.Schema({
    shortID:{
        type:String,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true
    },
    visitHistory: [{timestamp:{type:Number}}],
},{ timestamp:true}
)


module.exports=mongoose.model('URL',URLSchema);