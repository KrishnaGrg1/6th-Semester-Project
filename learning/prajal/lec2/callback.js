function add(num1,num2){
    console.log(`the sum of ${num1} and ${num2} is ${num1+num2}`);
}

function sub(num1,num2,add){
    console.log(`the sub of ${num1} and ${num2} is ${num1-num2}`);
}

function mult(num1,num2){
    console.log(`the multiply of ${num1} and ${num2} is ${num1-num2}`);
}

function divide(num1,num2){
    if(num2==0){
        console.log("Cannot divide by 0");
    }
    else{
        console.log(`the divide of ${num1} and ${num2} is ${num1*num2}`);
    }
}
const firstNumber=5;
const secondNumber=10;


function calculate(num1,num2,calculation){
    return calculation(num1,num2);
}

calculate(firstNumber,secondNumber,sub)

//anyonmus function
calculate(firstNumber,secondNumber,function(a,b){
    console.log(`10 is added the divide of ${firstNumber} and ${secondNumber} is ${(b/a ) +10}`);
})


let functionHolder;
functionHolder=add;
functionHolder(9,10)
