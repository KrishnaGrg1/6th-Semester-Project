const express=require('express');
const app=express();
const router=require('./routes/routes');
const port=8000;
const {connecttoMongoDB}=require('./connect');
const URL=require('./models/model');


connecttoMongoDB('mongodb://localhost:27017/shorturl')
.then((req,res)=>{
    console.log("Connected to MongoDB");
})
.catch((error)=>{
    console.log(error);
})

app.use(express.json());
app.use('/url',router);

app.get('/:shortID',async (req,res)=>{
    let shortId=req.params.shortId;

    const entry=await URL.findOneAndUpdate({
        shortId:shortId
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now(),
            }
        }
    },);
})


app.listen(port,(req,res)=>{
    console.log(`server is running on port ${port}`);
});