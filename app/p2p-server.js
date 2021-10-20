const WebSocket = require('ws');
const P2P_PORT = process.env.HTTP_PORT || 5001;
const perrs = process.env.PEERS ? process.env.PEERS.split(',') : ['ws://localhost:5002'];

class P2pServer {

    constructor(blockchain) {
        this.blockchain = blockchain;
        this.socket = [];
    }

    listen() {
        const server = new WebSocket.Server({ port: P2P_PORT });
        server.on('connection', socket => this.connectSocket(socket));
        this.connectToPeers();
        console.log('listening peer-to-peer connections')
    }

    connectSocket(socket) {
        this.socket.push(socket);
        console.log('socket connected');
        
        this.messageHandler(socket);
        this.sendChain(socket);

        socket.send(JSON.stringify(this.blockchain.chain))
    }

    sendChain(socket) {
        socket.send(JSON.stringify(this.blockchain.chain))
    }

    connectToPeers() {
        perrs.forEach(peer => {
            const socket = new WebSocket(peer);
            socket.on('open', () => this.connectSocket(socket));
        })
    }

    messageHandler(socket) {
        socket.on('message', message => {
            const data = JSON.parse(message);
            this.blockchain.replaceChain(data)
        })
    }

    syncChain() {
        this.socket.forEach(socket => this.sendChain(socket));
    }
}

module.exports = P2pServer;