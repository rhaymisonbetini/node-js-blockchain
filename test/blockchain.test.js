const Blockchain = require('../blockchain.js')
const Block = require('../block.js')
const { it, expect } = require('@jest/globals');

describe('Blockchain', () => {

    let bc;
    let bc2;

    beforeEach(() => {
        bc = new Blockchain;
        bc2 = new Blockchain;
    })

    it('start with genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesisBlock)
    })

    it('adds a new Block', () => {
        const data = 'arquivo.bin';
        bc.addBlock(data)
        expect(bc.chain[bc.chain.length - 1].data).toEqual(data)
    })

    it('is valid blockchain', () => {
        bc2.addBlock('400');
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    })

    it('invalidates a chain with currupted geneisBlock', () => {
        bc2.addBlock('600');
        bc2.chain[0].hash = '342343243243';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    })

})