var cryptoData = {
    date: "21 may, 2024",
    currencies: [
        {
            'name': "BitCoin",
            "exchangeRate": 97000,
            'foundIn': '2005'
        },
        {
            'name': "Ethereum",
            "exchangeRate": 3200,
            'foundIn': '2013'
        },
        {
            'name': "DogeCOIN",
            "exchangeRate": 0.32,
            'foundIn': '2016'
        },
        {
            'name': "Stack",
            "exchangeRate": 2.2,
            'foundIn': '2019'
        }
    ],
}


console.log(cryptoData.currencies);
// There are 4 currency data
// The rate of bitcoin is 97000 as of 21 may, 2024
console.log(cryptoData.currencies.exchangeRate);



// console.log(`There are ${cryptoData.currencies.length} currency data`)
// console.log(`The rate of ${cryptoData.currencies[0].name} is ${cryptoData.currencies[0].exchangeRate} as of ${cryptoData.date}`)


/*
 *name:Solana
 *rate:190
 *foundIn:2022
 */
 cryptoData.currencies.push({
    name: "Solana",
    exchangeRate: 180,
    foundIn: "2022"
})

//  console.log("Name:",cryptoData.currencies[4].name)
//  console.log("Ecxhange:",cryptoData.currencies[4].exchangeRate)
//  console.log("FoundIn:",cryptoData.currencies[4].foundIn)


 /*change rate of stack from 2.2 to 2.4 */

 cryptoData.currencies[3].exchangeRate=2.4;
 console.log(" Exchange rate of stack is : ",cryptoData.currencies[3].exchangeRate)


 //print exchange rate of all curriencies

//  for(let i of cryptoData.currencies.exchangeRate){
//     console.log("Exchange rate are:",i);
// }

// let sum=0;
// function add(){
//     for(let i=0;i<(cryptoData.currencies).length;i++){
//     sum=sum+cryptoData.currencies[i].exchangeRate;
//     }
//     return sum;
// }

// console.log(add())


