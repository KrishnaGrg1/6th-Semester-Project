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
// Task 8: Add a new property symbol to all currencies
// Add a new property symbol for each currency. Here’s what the values for symbol could be:

// "Bitcoin" → "BTC"
// "Ethereum" → "ETH"
// "DogeCoin" → "DOGE"
// "Stack" → "STACK"
// "Solana" → "SOL"


function addSymbol(a){
    for(let i=0;i<(a).length;i++){
        switch(a[i].name){
            case "BitCoin":
                a.push({
                    Symbol:"BTC"
                })
        }
    }
}

addSymbol(cryptoData.currencies)
console.log(cryptoData.currencies)