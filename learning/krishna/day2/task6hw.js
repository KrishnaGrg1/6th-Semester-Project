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
// Task 6: Calculate the total exchange rate for all currencies
// Write a function that calculates the sum of the exchangeRate for all the cryptocurrencies listed in currencies.
function sumExchangeRate(a){
  let sum=0;
  for(let i=0;i<(a).length;i++){
    sum=sum+a[i].exchangeRate;
  }
  console.log(sum);
}
sumExchangeRate(cryptoData.currencies)
