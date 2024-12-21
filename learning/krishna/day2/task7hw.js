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
// Task 7: Display all cryptocurrencies found after 2010
// Create a list of cryptocurrencies that were found after the year 2010. For example, you can create a new array and log out the details of those currencies.


// let n="";
// for(let i=0;i<(cryptoData.currencies).length;i++){
//         if(cryptoData.currencies[i].foundIn>2010){
//             n=n+JSON.stringify(cryptoData.currencies[i]);
//         }
//         }
//         console.log(n)

for(let i=0;i<(cryptoData.currencies).length;i++){
        if(cryptoData.currencies[i].foundIn>2010){
            console.log(cryptoData.currencies[i])
        }
        }


// console.log(cryptoData.currencies)