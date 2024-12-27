//  function add(num1,num2){
//     return  num1+num2;
// }

// for(let i=0;i<5;i++){
//     console.log(add(i,5));
// }

function sumOfNumberUpto(num1){
    let sum=0;

    for(let i=1;i<=num1;i++){
        sum=sum+i;
  
    }
    return sum;
   
}
console.log(sumOfNumberUpto(4));
