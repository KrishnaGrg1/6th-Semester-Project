import express, { json } from "express";
const server=express();
const port=process.env.port||9000;

server.use(express.json());

var user=[{
    name:"John",
    kidneys:[{
        // healthy:true
    }
]
}]

server.get('/',(req,res)=>{
    var JohnKidneys=user[0].kidneys;
    var numberofkidneys=JohnKidneys.length;
    var numberOfHealthyKidneys=0;
    for(let i=0;i<numberofkidneys;i++){
        if(JohnKidneys[i].healthy){
            numberOfHealthyKidneys=numberOfHealthyKidneys+1;
        }
    }
    let numberOfUnhealthyKidneys=numberofkidneys-numberOfHealthyKidneys;
    res.json({
        numberofkidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})


server.post('/',(req,res)=>{
    const isHealthy=req.body.isHealthy;
    user[0].kidneys.push({
        healthy:isHealthy
    });
    res.json({
        msg:"Done "
    })

})

server.put('/',(req,res)=>{
    var JohnKidneys=user[0].kidneys;
    var numberofkidneys=JohnKidneys.length;
    for(let i=0;i<numberofkidneys;i++){
        if(!(JohnKidneys[i].healthy)){
            JohnKidneys[i].healthy=true
        }
    }
    res.json({
        msg:"Done "
    })

})


server.delete('/',(req,res)=>{
    
    var JohnKidneys=user[0].kidneys;
    var numberofkidneys=JohnKidneys.length;
    let newKidneys=[];
    try{
        if(numberofkidneys!==0){
            for(let i=0;i<numberofkidneys;i++){
                if(JohnKidneys[i].healthy){
                    newKidneys.push({
                        healthy:true
                    })
                }
            }
        }
        else{
            res.status(411).json({
                msg:"You have no bad kidneys"
            })
        }
        user[0].kidneys=newKidneys;
        res.json({
            msg:"Done "
        })
    
    }catch(e){
        console.log(e)
    }
    
    
    
   
})

server.listen(port,()=>{
    console.log(`Server started on ${port}`);
})



