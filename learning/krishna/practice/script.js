const exp = require("constants");
const express = require("express");
const zod=require('zod');
const app = express();
const port = 8000;
let initialcount=0;


const schema=zod.array(zod.number);
// to manage the paragraph use option+z or alt+z//

function countRequest(req,res,next){
    initialcount++;
    next();
}
function userMiddleware(req,res,next){
    const username=req.headers.username;
    const userpassword=req.headers.userpassword;
    if(username!="admin" || userpassword != "pass"){
        res.json({
            msg:"Your username and password is not correct"
        })
    }
    next();
}

function kidneyMiddleware(req,res,next){
    const kidneyId=req.query.kidneyId;

    if(kidneyId !=1 && kidneyId !=2){
        res.json({
            msg:"Invalid kidney"
        })
    }
    next();
}
app.use(countRequest,userMiddleware,kidneyMiddleware);
app.use(express.json());

app.get("/health-checkup", (req, res) => {
    const username=req.headers.username;
    const userpassword=req.headers.userpassword;
    const kidneyId=req.query.kidneyId;
  res.send({
    username,
    userpassword,
    kidneyId,initialcount
  })
});

app.post("/health-checkup", (req, res) => {
    const kidneyId=req.body.kidneyId;
    const response=schema.safeParse(kidneyId)
    const kidneyLength=kidneyId.length;
    if(!kidneyId){
        res.status(411).json({
            msg:"Invalid inputs "
        })
    }else{
        res.send("Your kidney length is "+ kidneyLength);
    } 
})
let errCount=0;

app.use((err,req,res,next)=>{
    errCount++
    res.json({
        msg:"Something is wrong on the server",
        errCount
    })
})

app.listen(port);
