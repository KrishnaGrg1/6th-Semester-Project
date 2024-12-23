//Task1: Implement a custom callback function: Write a function named modulus that calculates the remainder of two numbers and pass it as a callback to the calculate function.\


// function modulus(num1,num2){
//     console.log(`The modoulus of ${num1} and ${num2} is ${num1%num2}`);
// }

// function calulate(a,b,calulation){
//     return calulation(a,b);
// };

// calulate(10,6,modulus);


//Taask 2: Use callback functions for conditional logic: Write a function named isGreater that takes two numbers as arguments and logs which number is greater. Pass this function as a callback to the calculate function.

// function isGreater(num1,num2){
//    console.log(`Greatest number between ${num1} and ${num2} is  ${num1>num2 ? num1 :num2}`);
// }

// function calculate(a,b,calculates){
//     return calculates(a,b);
// }
// calculate(8,10,isGreater);



//Task3: Create an array processing callback: Write a function named processArray that takes an array of numbers and a callback function. Use the callback function to calculate the sum of all even numbers in the array.

// function addArray(arr){
//     let sum=0;
//     for(let i=0;i<arr.length;i++){
//             sum+=arr[i];
//             }
//             console.log(`The sum of ${arr} is ${sum}`);
// }

// function callback(a,calculate){
//     return calculate(a);
// }
// const array=[9,19,90,27,29];
// callback(array,addArray)

//Task4:Transform numbers using callbacks: Create a function square that returns the square of a number. Pass it as a callback to a new transform function that applies the callback to each number in an array and returns the transformed array.

// function square(num){
//     let num2=num.map(function(items){
//         return items*items;
//     })
//     console.log(`The square of given array ${num} is  ${num2}`)
// }
// function callback(a,calculate){
//     return calculate(a);
// }
// callback(array,square)


//Task5:Build a string manipulation callback: Write a function concatenateStrings that takes two strings, concatenates them, and returns the result. Pass this as a callback to a generic function that takes two strings and a callback.

function concatenation(string1,string2){
    s1=string1.toString();
    s2=string2.toString()
    console.log(`The concatenation of ${s1} and ${s2} is ${s1+s2}`)

}

// concatenation(4,5)
function callback(a,b,calculate){
    return calculate(a,b);
}

callback(6,7,concatenation)


//Task6:Chain callbacks with mathematical operations: Create a function chainCalculate that takes two numbers and two callbacks. The first callback performs an operation (e.g., addition), and the second callback uses the result to perform another operation (e.g., multiplication by 2).

function chainCalculate(num1,num2){
    return num1,num2;
}

function add(a,b,chainCalculate){
    return chainCalculate(a,b)
}
function multiply(ans,add){
 return ans*2;
}

function callback(){
    
}