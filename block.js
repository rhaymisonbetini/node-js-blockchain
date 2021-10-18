const SHA256 = require('crypto-js/sha256');

class Block {

    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.genesisBlock;
    }

    toString() {
        return `Block = Timestamp: ${this.timestamp} LasthHash: ${this.lastHash.substring(0, 10)} Has: ${this.hash.substring(0, 10)} Data: ${this.data}`
    }

    static genesis() {
        this.genesisBlock = new this(Date.now(), '-------', SHA256('genesis'), [])
        return this.genesisBlock;
    }

    static mineBlock(lastBlock, data) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = this.hash(timestamp, lastHash, data);
        return new this(timestamp, lastHash, hash, data);
    }

    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    static blockHash(block) {
        const { timestamp, lastHash, data } = block
        return Block.hash(timestamp, lastHash, data);
    }

}

module.exports = Block;