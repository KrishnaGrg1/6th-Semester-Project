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

// Task 2: Add a new cryptocurrency to the list
// Add a new cryptocurrency called Solana with the following properties:

// name: "Solana"
// exchangeRate: 190
// foundIn: "2020"


cryptoData.currencies.push({
    name: "Solana",
    exchangeRate: 190,
    foundIn: "2020"
})

console.log(cryptoData.currencies)