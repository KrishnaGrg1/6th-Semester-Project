const express = require('express');
const { connecttoMongoDB } = require('./connect');
const Urlroutes = require('./routes/url');
const URL =require('./models/url')
const port = 8000;

connecttoMongoDB('mongodb://localhost:27017/shorturl')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log(error);
    });

const app = express();
app.use(express.json());
app.use('/url', Urlroutes);

app.get('/:shortId',async(req,res)=>{
    const shortID=req.params.shortId;
   const entry=await URL.findOneAndUpdate({
        shortId:shortID
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now(),
            }
        }
    },
);
    res.redirect(entry.redirectURL);
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
