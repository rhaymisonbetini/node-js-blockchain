const express = require('express');
const Blockchain = require('../blockchain/blockchain.js')
const HTTP_PORT = process.env.HTTP_PORT || 3001;
const P2pServer = require('./p2p-server.js');

const app = express();
const bc = new Blockchain();
const p2pService = new P2pServer(bc);

app.use(express.json())

app.get('/blocks', (req, res) => {
    res.json(bc.chain);
})

app.post('/mine', (req, res) => {
    bc.addBlock(req.body.data);
    P2pServer.syncChain();
    res.redirect('/blocks')
})

app.listen(HTTP_PORT, (_) => {
    console.log('LISTENING')
})

p2pService.listen();

