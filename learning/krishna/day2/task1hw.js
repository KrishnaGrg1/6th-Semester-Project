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
// Task 1: Display the exchange rate for Ethereum
// Write a code snippet that shows the following output:
// "The rate of Ethereum is 3200 as of 21 may, 2024"
console.log(`The rate of ${cryptoData.currencies[1].name} is ${cryptoData.currencies[1].exchangeRate} as of ${cryptoData.date}`);