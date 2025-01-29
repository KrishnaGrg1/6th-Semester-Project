function sumOfDigit(num){
    let n=num.toString()
    let sum=0
    for(let i=0;i<n.length;i++ ){
        sum=sum+parseInt(n.split('')[i])
    }
    return sum
}

console.log(sumOfDigit(234))


