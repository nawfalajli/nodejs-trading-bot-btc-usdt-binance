# nodejs-trading-bot-btc-usdt-binance
> Crypto Trading Bot For Bitcoin/USDT With NodeJS & Binance API

## Technologies

-  [NodeJS](https://nodejs.org/en/)

-  [Axios](https://axios-http.com/fr/docs/intro)

-  [CoinGeckoAPI](https://www.coingecko.com/en/api/documentation)

-  [BinanceAPI](https://www.binance.com/en/binance-api)

## Run Bot

- npm install
- npm start

#  Doc
```javascript
//connect to binance
const binanceClient = new ccxt.binance({
    apiKey: process.env.API_BINANCE_KEY,
    secret: process.env.API_BINANCE_SECRET_KEY
  });

 //fetch orders
 const orders = await binanceClient.fetchOpenOrders(market);
  orders.forEach(async order => {
    await binanceClient.cancelOrder(order.id)
  });

//get current prices
const results = await Promise.all([
    axios.get('https//api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'),
    axios.get('https//api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd'),
  ]);

```
