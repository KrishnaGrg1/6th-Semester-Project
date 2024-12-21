let a=123;

function sum(a){
let i=0;
 while(a>0){
    i=i+a%10;
    a=parseInt(a/10);

 }
 return i;
}
console.log(sum(123))