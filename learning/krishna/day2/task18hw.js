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

// Task 18: Show how many years ago each cryptocurrency was created
// For each cryptocurrency, calculate how many years ago it was created from the current year (2024). Add a new property yearsAgo to each cryptocurrency object and display the updated array.


function conversion(a){
    for(let i=0;i<(a).length;i++){
        let latestYear=2024;
        let YearAgo=latestYear- parseInt(a[i].foundIn)
        console.log(`{a[i].name} was created ${YearAgo} ago`)
    }
}

conversion(cryptoData.currencies)

