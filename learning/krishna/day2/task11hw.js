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

// Task 11: Find the index of Ethereum in the currencies list
// Find the index position of Ethereum in the currencies array and display it.

function searchindex(a){
    let b=cryptoData.currencies;
    for(let i=0;i<b.length;i++){
        if(a===b[i].name){
            console.log(`The index of ${b[i].name} is ${i}`);
        }
    }
}

searchindex("Ethereum")
