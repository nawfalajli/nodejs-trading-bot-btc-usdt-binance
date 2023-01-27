require('dotenv').config
const ccxt = require('ccxt'),
  axios = require('axios'),
  express = require('express')

const app = express();


const config = {
  asset: 'BTC',
  base: 'USDT',
  allocation: 0.1,
  spread: 0.2,
  tickInterval: 2000
};

const run = () => {
  tick();
}

const tick = async () => {

  const binanceClient = new ccxt.binance({
    apiKey: process.env.API_BINANCE_KEY,
    secret: process.env.API_BINANCE_SECRET_KEY
  });
  tick(config, binanceClient);
  setInterval(tick, config.tickInterval, config, binanceClient)

  const market = `${config.asset}/${config.base}`;

  const orders = await binanceClient.fetchOpenOrders(market);
  orders.forEach(async order => {
    await binanceClient.cancelOrder(order.id)
  });

  /***
  get price now from coingecko api docs
  https://www.coingecko.com/en/api/documentation
  **/

  const results = await Promise.all([
    axios.get('https//api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'),
    axios.get('https//api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd'),
  ]);
  const marketPrice = results[0].data.bitcoin.usd /
    results[1].data.tether.usd;

  const sellPrice = marketPrice * (1 + spread);
  const buyPrice = marketPrice * (1 - spread);
  const balances = await binanceClient.fetchBalance();
  const assetBalance = balance.free[asset];
  const baseBalance = balance.free[base];
  const sellVolume = assetBalance * allocation;
  const butVolume = (baseBalance * allocation) / marketPrice;

  await binanceClient.createLimitSellOrser(market, sellVolume, sellPrice);
  await binanceClient.createLimitBuyOrder(market, buyVolume, buyPrice);

  console.log(`Trade for ${market} ==>
               Limit sell order for ${sellVolume} | ${sellPrice} ==>
               Limit buy order for ${buyVolume} | ${buyPrice}`)
}



//const configPIP = require(path.resolve('config.js'));
app.listen(3000, function() {
  console.log('Express server listening on %d, in %s mode', 3000);
  run();
  console.log('Made by nawfal ajli');
});