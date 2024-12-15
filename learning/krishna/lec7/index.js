const { error } = require('console');
const fs= require('fs');

// fs.writeFileSync("example.txt","Hello Nepal \n");


// const text =fs.readFileSync("example.txt","utf-8");

// console.log(text);


// fs.appendFileSync("example.txt","File added");


// const text1 =fs.readFileSync("example.txt","utf-8");

// console.log(text1);

fs.writeFile('ans.txt',"hello world \n",(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("File written successfully");
    }
})


const text=fs.readFile('ans.txt',"utf-8",(err,data)=>{
    if(err){
        console.log(err);
    }
    console.log(data)
});


console.log(text);


fs.appendFile("ans.txt","\n Nepal",(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("File appended successfully");
    }
})


fs.readFile('ans.txt',"utf-8",(err,data)=>{
    if(err){
        console.log(err);
    }
    console.log(data)
});


fs.unlink("example.txt",(error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("File deleted successfully");
    }
})


