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

// Task 15: Find the currency with the name "Stack"
// Write a function that searches for the cryptocurrency called "Stack" and returns its details (including the name, exchange rate, and year found).


function search(a){
 for(let i=0;i<(cryptoData.currencies).length;i++){
    if(cryptoData.currencies[i].name===a){
        console.log(`Found "${cryptoData.currencies[i].name}" which index is ${i}`)
    }
 }
}

search("Stack");