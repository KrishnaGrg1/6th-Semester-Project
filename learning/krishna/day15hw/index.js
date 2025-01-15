import { config } from 'dotenv';
import express from 'express';
import jokesRouter from './routes/jokes.js';
const app=express()
config();
const port=process.env.PORT ||8002

app.use(express.static('public'));

app.use(express.json())
app.use('/jokes',jokesRouter);



app.listen(port,()=>{
    console.log("Server listening on Port"+port)
})

