// 50
// 40 39
// 30 29 28
// 20 19 18 17
// 10 9   8  7 6
// let pattern = '';
// let rows = 5;

// for (let i = 1; i <= rows; i++) {
//     let first = 60 - i * 10; // Calculate the starting number for each row
//     for (let j = 0; j < i; j++) {
//         let variable = first - j; // Calculate the current number to print
//         pattern += variable + ' '; // Append the number to the pattern string
//     }
//     pattern += '\n'; // Add a newline after each row
// }

// console.log(pattern);

// let pattern=0;
// let rows=5;
// let variable=0;

// for(let i=1;i<=rows;i++){
//     let first=60-i*10;
//     for(let j=0;j<i;j++){
//        variable=first-j;
//        pattern=pattern+variable+"  ";
//     }
//     pattern=pattern+"\n";
// }

// console.log(pattern)

// let rows=5;
// let pattern=0;
// let variable=0



// for(let i=1;i<=rows;i++){
//     let temp=60-i*10;
//     for(let j=0;j<i;j++){
//         variable=temp-j;
//         pattern=pattern+variable+' ';
 
//        }
       
//     pattern=pattern+"\n";
// }

// console.log(pattern)

let pattern=0;
let rows=5;
let variable=0;

for(let i=1;i<=5;i++){
    let temp=60-i*10;
    for(let j=0;j<i;j++){
        variable=temp-j;
        pattern=pattern+variable+" ";
    }
    pattern=pattern+"\n";
}
console.log(pattern);