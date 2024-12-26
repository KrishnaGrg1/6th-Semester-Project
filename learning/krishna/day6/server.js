import express from 'express';

 const server=new express();

 server.get('/',function(req,res){

    switch(req.query.operation){
        case "addition":
            res.send(`The ${req.query.operation} of ${req.query.first}  and ${req.query.last} is ${parseInt(req.query.first) + parseInt(req.query.last)}`);
        case "subtract":
            res.send(`The ${req.query.operation} of ${req.query.first}  and ${req.query.last} is ${parseInt(req.query.first) - parseInt(req.query.last)}`);
        case "multiply":
            res.send(`The ${req.query.operation} of ${req.query.first}  and ${req.query.last} is ${parseInt(req.query.first) * parseInt(req.query.last)}`);
        case "divide":
            if(parseInt(req.query.last)==0){
                res.send("Last number is 0 ")
            }else{
                res.send(`${req.query.last} ${req.query.operation} by ${req.query.first} is ${parseInt(req.query.last)/parseInt(req.query.first) }`);
            }
        default:
            res.send("Invalid operation")
    }
    

    
 })

 server.listen(300,function(){
    console.log("Server started running on port:300")
 })