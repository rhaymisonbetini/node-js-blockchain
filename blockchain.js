const Block = require('./block.js')

class Blockchain {

    constructor() {
        this.chain = [Block.genesis()]
    }

    addBlock(data) {
        const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
        this.chain.push(block);
        return block;
    }

    isValidChain(chain) {
        if (JSON.stringify(chain) !== JSON.stringify(Block.genesisBlock)) return false;

        for (let i = 0; i < chain.length; i++) {
            const block = chain[i];
            const lastBlock = block.chain[i - 1];
            if (block.lastHash !== lastBlock.lastHash || block.hash !== Block.blockHash(block)) return false;
        }
        return true;
    }

}

module.exports = Blockchain;