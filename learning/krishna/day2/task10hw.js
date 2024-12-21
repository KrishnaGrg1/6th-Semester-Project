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


// Task 10: Find the currency with the highest exchange rate
// Write a function that finds and logs the cryptocurrency with the highest exchange rate from the currencies array.

function highestExchangeRate(a){
    let high=0;
    for(let i=0;i<(a).length;i++){
        if(a[i].exchangeRate>high){
            high=a[i].exchangeRate;
            
        }else{
            high=high
        }
    }
    return high
}
console.log(highestExchangeRate(cryptoData.currencies));

// console.log(cryptoData.currencies)