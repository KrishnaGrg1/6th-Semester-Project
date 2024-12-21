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

// Task 14: Add a property lastUpdated with the current date
// Add a new property lastUpdated to the cryptoData object. Set this to the current date in the format DD MM, YYYY. You can use the Date object for this task.

let sum=0;
function add(num){
    for(let i=0;i<(num).length;i++){
    sum=sum+num[i].exchangeRate;
    }
    return sum;
}
let total=add(cryptoData.currencies);


const cryptoSummary={
    date: "21 may, 2024",
    totalCurriencies:total,
}

console.log(cryptoSummary)
