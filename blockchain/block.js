const SHA256 = require('crypto-js/sha256');
const { DIFFICULT, MINE_RATE } = require('../config.js');
class Block {

    constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULT;

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

        this.genesisBlock = new this(dataAtual, '-------', this.hash(dataAtual, '_______', []), [], 0, DIFFICULT)
        return this.genesisBlock;
    }

    static mineBlock(lastBlock, data) {

        let hasher, timestamp;
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0;

        do {

            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hasher = Block.hash(timestamp, lastHash, data, nonce, difficulty);

        } while (hasher.substring(0, DIFFICULT) !== '0'.repeat(DIFFICULT));

        return new this(timestamp, lastHash, hasher, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime) {

        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ?
            difficulty + 1 : difficulty - 1;
            
        return difficulty;

    }

    static hash(timestamp, lastHash, data, nonce, difficulty) {
        return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block) {
        const { timestamp, lastHash, data, nonce, difficulty } = block
        return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }

}

module.exports = Block;