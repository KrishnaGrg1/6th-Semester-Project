const express=require('express');
const app=express();

// let requestcount=0;
// app.use((req,res,next)=>{
//     requestcount=requestcount+1;
//     next();
//    })


app.use((req,res,next)=>{
    setInterval(()=>{

    },1000)
})
function OldEnoughAge(req,res,next){
   
    if(req.query.age>14){
       next();
    }else
    {
        res.status(400).json({
        msg:"Not enough Age criteria",
        requestcount
    })
}}


app.use(OldEnoughAge);

app.get('/ride1',(req,res)=>{
    res.json({
        msg:"Successfully done ride1",
        requestcount
    })
})

app.get('/ride2',(req,res)=>{
    res.json({
        msg:"Successfully done ride2",
        requestcount
    })
})

app.listen(9000)