import jwt from "jsonwebtoken";


const str="Hello world from Nepal , Krishna";
const secretKey="123"

const token=jwt.sign({str},secretKey);

let token1="eyJhbGciOiJIUzI1NiJ9.YmlzaGFs.KFTrx_H6dn5CUQx7Few2fbkhnRURmHjdokcoyxZdGbo";


let isverified=false;
let payload=null;


try{
    payload=jwt.verify(token1,secretKey);
    isverified=true
}
catch(e){
    console.log(e.message)
}

// console.log(token)

console.log({payload,isverified})