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

// Task 17: Convert the exchange rate of all currencies to USD
// Write a function that takes an exchange rate in a different currency (e.g., Euro, GBP, etc.) and converts all the cryptocurrency rates to USD. This will involve multiplying the exchange rate by a conversion factor.


function conversion(a){
    for(let i=0;i<(a).length;i++){
        // let value=a[i].exchangeRate * 1.02;
        // console.log(`${a[i].name} is converted from €${a[i].exchangeRate} to $${value}`)
       a[i].exchangeRate= a[i].exchangeRate * 1.02;
    }
}

conversion(cryptoData.currencies)

console.log(cryptoData.currencies)