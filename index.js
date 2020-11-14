const express = require('express');
const app = express();
const port = 5000;
const solanaWeb3 = require('@solana/web3.js');

let url = 'http://api.mainnet-beta.solana.com';
const connection = new solanaWeb3.Connection(url);

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname });
})

app.get('/balance', (req, res) => {
    let accountKey = req.query.accountKey;
    let publicKey = new solanaWeb3.PublicKey(accountKey);
    connection.getBalance(publicKey).then(balance => {
        balance = balance/1000000000;
        res.send({
            accountKey: accountKey,
            balance: balance
        })  
    });
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})