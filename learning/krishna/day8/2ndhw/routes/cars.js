import { readFileSync,writeFileSync } from "fs";



function viewallcars(){
    const data=readFileSync("/Users/krishnabahadurgurung/Documents/Project/sample4/6th-Semester-Project/learning/krishna/day8/2ndhw/cars.json",{encoding:"utf-8"});
    const dataObj=JSON.parse(data);
    return dataObj;
}

function addcars(task){
    if (!task) {
        throw new Error("Task Name needed.");
    }
   const {cars}=viewallcars();
   let numberOfCars=cars.length;
    
   for(let i=0;i<numberOfCars;i++){
    if (cars[i].model === task.model && cars[i].manufacturer === task.manufacturer) {
        throw new Error ("Car Model and Manufacturer already exist"); // No need to add it again
    }
   }
    cars.push(task);
    let write={cars};
    let obj=JSON.stringify(write);
    writeFileSync("/Users/krishnabahadurgurung/Documents/Project/sample4/6th-Semester-Project/learning/krishna/day8/2ndhw/cars.json",
    obj,{encoding:"utf-8"});
    return write;
}

function viewcars(carsId){

    const {cars}=viewallcars();
    const length=cars.length-1;

    if(carsId>length){
        throw new Error (`Cars ID: ${carsId} not found`)
    }
        const carDetails=cars[carsId];
        return carDetails;
    
  
}

function editcars(carsId,carsDetails){
    const {cars}=viewallcars();
    let numberOfCars=cars.length;
    console.log(carsDetails);
    if(carsId<numberOfCars){
        cars[carsId]=carsDetails;
        let toWrite={cars};
        let obj=JSON.stringify(toWrite);
        writeFileSync("/Users/krishnabahadurgurung/Documents/Project/sample4/6th-Semester-Project/learning/krishna/day8/2ndhw/cars.json",
        obj,{encoding:"utf-8"});
        return toWrite;
    }else{
        throw new Error (`Car Id: ${carsId} not found`)
    }
}
function deletecars(carsId){
    const {cars}=viewallcars();
    let length=cars.length;
    if(carsId<(length)){
        cars.splice(carsId,1);
        let write={cars};
        let obj=JSON.stringify(write);
        writeFileSync("/Users/krishnabahadurgurung/Documents/Project/sample4/6th-Semester-Project/learning/krishna/day8/2ndhw/cars.json",
        obj,{encoding:"utf-8"});
        return {msg:`CarID: ${carsId} is deleted`};
    }else{
        throw new Error (`Car Id: ${carsId} not found`)
    }
   
    
}

export {viewallcars,addcars,viewcars,editcars,deletecars}