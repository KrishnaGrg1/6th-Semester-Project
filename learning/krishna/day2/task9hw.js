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

// Task 9: Sort the currencies by exchange rate
// Write code to sort the currencies by their exchange rate in descending order and log the sorted list.

console.log(cryptoData.currencies.sort(cryptoData.currencies.exchangeRate))