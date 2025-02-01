import express from 'express';

const app=express();

//server
app.get('/about',(req,res)=>{
    res.send("Prjal adas ");
})

//post:client request server lai

//put:edit

//delet:delete


app.listen(8000,()=>{
    console.log("Port listening on "+8000)
})

