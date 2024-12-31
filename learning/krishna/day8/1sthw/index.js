//Alt+shift+f to 
 //1. Change the Request methods from GET to :
//  - POST for those routes in which new data is added
//  - PUT for those in which data is edited 
//  - DELETE for those in which existing data is delted
import express from "express";
import { viewall,addtodo, editTodo,deleteTodo} from "./routes/view.js";
const port=9000;
const server=express();
server.use(express.json())


server.get('/view',(req,res)=>{
    res.send(viewall());
})

server.post('/view/task/:task',(req,res)=>{
    try {
        return res.json(addtodo(req.params.task));
    } catch (e) {
        return res.status(400).json({error: e.message})
    }
})

server.put('/view/task/:taska/:taskb',(req,res)=>{
    try {
        return res.json( editTodo(req.params.taska,req.params.taskb));
    } catch (e) {
        return res.status(400).json({error: e.message})
    }
})

server.delete('/view/task/:task',(req,res)=>{
    try {
        return res.json( deleteTodo(req.params.task));
    } catch (e) {
        return res.status(400).json({error: e.message})
    }
      
})



server.listen(port, function () {
    console.log("Server running on port", port)
})