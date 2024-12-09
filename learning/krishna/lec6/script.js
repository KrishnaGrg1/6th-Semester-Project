const express=require('express');
const app=express();
const path=require('path');
const port=8000;

app.set("view engine","ejs");
app.set('views',path.resolve('./views'));

app.use(express.json());


app.get('/home',(req,res)=>{
    res.render('home')
})


app.listen(port,(req,res)=>{
    console.log(`Server Started :http//localhost:${port}`);
})