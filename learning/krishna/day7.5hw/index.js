import express from "express";
const server=express();
import { config } from 'dotenv';
config();
const port= 4000;

const user=[{
    count:30,
    task:[
        "completedtask"
      ]
}]


server.get('/views/tasks/add/:task',(req,res)=>{
    const task=req.params.task;
    const user1=user[0];
    user1.task=[task];
    res.json(task)

})
server.get('/views/tasks/remove/:task', (req, res) => {
    const t = req.params.task;  
    let userTask = user[0].task;  
    let updatedTasks = [];  

  
    for (let i = 0; i < userTask.length; i++) {
        if (userTask[i] !== t) {
            updatedTasks.push(userTask[i]);  
        }
    }

   
    if (updatedTasks.length !== userTask.length) {
        user[0].task = updatedTasks;  
        res.json({
            msg: "Task removed successfully"
        });
    } else {
        res.status(411).json({
            msg: "Task not found"
        });
    }
});

server.get('/views/tasks',(req,res)=>{
    const count=user[0].count;
    const task=user[0].task
    res.json({
        count,task
    })

})


server.listen(port,function(req,res){
    console.log("server started on Port:"+port);
})
