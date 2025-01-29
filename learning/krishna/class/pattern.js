// 50
// 40	39
// 30	29	28
// 20	19	18	17
// 10	9	8	7	6


let initialNum=50;
let difference=10;
let row=5;

for(let i=1;i<=row;i++){
    let toPrint=initialNum;
    for(let j=1;j<i;j++){
        let min=(parseInt(toPrint)-j)
        toPrint=toPrint + "\t" + min
    }
    console.log(toPrint)
    initialNum=initialNum-difference
}

