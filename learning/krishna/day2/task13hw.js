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
        }
        ,
        {
            'name': "Stack",
            "exchangeRate": 2.2,
            'foundIn': '2019'
        },
        {
            'name': "DogeCOIN",
            "exchangeRate": 0.32,
            'foundIn': '2016'
        }
    ],
}

// Task 13: Create a new object cryptoSummary
// Create a new object cryptoSummary with two properties:
// date: Copy the date from the cryptoData object.
// totalCurrencies: Calculate and store the total number of cryptocurrencies in the currencies array.

let sum=0;
function add(num){
    for(let i=0;i<(num).length;i++){
    sum=sum+num[i].exchangeRate;
    }
    return sum;
}
let total=add(cryptoData.currencies);


const cryptoSummary={
    date: "21 may, 2024",
    totalCurriencies:total,
}

console.log(cryptoSummary)
