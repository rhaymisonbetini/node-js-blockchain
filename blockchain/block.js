const SHA256 = require('crypto-js/sha256');
const DIFFICULT = 4;

class Block {

    constructor(timestamp, lastHash, hash, data, nonce) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.genesisBlock;
    }

    toString() {
        return `Block = Timestamp: ${this.timestamp} LasthHash: ${this.lastHash.substring(0, 10)} Has: ${this.hash.substring(0, 10)} Data: ${this.data}`
    }

    static genesis() {

        var data = new Date();
        var dia = String(data.getDate()).padStart(2, '0');
        var mes = String(data.getMonth() + 1).padStart(2, '0');
        var ano = data.getFullYear();
        var dataAtual = dia + '/' + mes + '/' + ano;

        this.genesisBlock = new this(dataAtual, '-------', this.hash(dataAtual, '_______', []), [], 0)
        return this.genesisBlock;
    }

    static mineBlock(lastBlock, data) {

        let hasher, timestamp;
        const lastHash = lastBlock.hash;
        let nonce = 0;

        do {

            nonce++;
            timestamp = Date.now();
            hasher = Block.hash(timestamp, lastHash, data, nonce);

        } while (hash.substring(0, DIFFICULT) !== '0'.repeat(DIFFICULT));

        return new this(timestamp, lastHash, hash, data, nonce);
    }

    static hash(timestamp, lastHash, data, nonce) {
        return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
    }

    static blockHash(block) {
        const { timestamp, lastHash, data, nonce } = block
        return Block.hash(timestamp, lastHash, data, nonce);
    }

}

module.exports = Block;