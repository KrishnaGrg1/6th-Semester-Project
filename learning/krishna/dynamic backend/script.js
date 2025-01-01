const express=require('express');
const app=express();
const mongoose=require("mongoose");
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/sampleurl')

const User=mongoose.model('Users',{
    name:String,email:String,password:String
})



app.post('/signup',async(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const alreadyexistingUser=User.findOne({email:email});
    if(alreadyexistingUser){
        res.status(411).json({
            msg:"Already Email Exist"
        })
    }
    const user=new User({
        name:name,
        email:email, 
        password:password
    })
    user.save(); 
    res.json({
        msg:"Successfully signup"
    })
    
})

app.listen(9000);