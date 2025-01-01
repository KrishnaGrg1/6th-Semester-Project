let list=[1,2,3,4];
// let newList=[];
// for(let i=0;i<list.length;i++){
//     if(list[i]%2==0){
//         newList.push(+(list[i]));
//     }
//     else{
//         newList.push(-(list[i]));
//     }
//     }
// console.log(newList)

let double=list.map(function(i){
    return i*2;
});
console.log(double)