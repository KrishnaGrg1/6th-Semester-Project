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

// Task 12: Display the names of all currencies in a single string
// Write code to output the names of all cryptocurrencies as a comma-separated string.
// Example output:
// "BitCoin, Ethereum, DogeCoin, Stack, Solana"

let b=cryptoData.currencies
let allName="";
    for(let i=0;i<(b).length;i++){
        
            allName=allName+" "+ b[i].name;         
    }

console.log(`"${allName}"`)