// 50
// 40 39
// 30 29 28
// 20 19 18 17
// 10 9   8  7  6

const mainNumber=50;

const difference=10;

let toPrint=mainNumber;
do{
    toPrint= mainNumber + "";
    let count=(60-toPrint)/10
  for(let i=0;i<=count;i++){
    toPrint=mainNumber+"\t"+(mainNumber-i);
    console.log(toPrint);
    
  }
  mainNumber=mainNumber-difference;
}while(mainNumber>=10);