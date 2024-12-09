const express = require('express');
const { connecttoMongoDB } = require('./connect');
const Urlroutes = require('./routes/url');
const URL =require('./models/url')
const path=require('path')
const StaticRouter=require('./routes/StaticRouter')
const port = 8000;

connecttoMongoDB('mongodb://localhost:27017/shorturl')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log(error);
    });

const app = express();

//middleware//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/url', Urlroutes);
app.use('/',StaticRouter)

app.set('view engine','ejs');
app.set('views',path.resolve('views'))



app.get('/home',async(req,res)=>{
    const AllURL=await URL.find({});
    res.render('home',{
        urls:AllURL
    });

})

app.get('/:shortId', async (req, res) => {
    const shortID = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId: shortID },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        },
        { new: true } // This option returns the updated document
    );

    if (!entry) {
        return res.status(404).send('URL not found'); // Handle the case where the entry is not found
    }

    console.log(entry);
    res.redirect(entry.redirectURL);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
