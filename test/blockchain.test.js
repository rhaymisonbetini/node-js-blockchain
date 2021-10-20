const Blockchain = require('../blockchain/blockchain.js')
const Block = require('../blockchain/block.js')
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

    it('replace the chain with a valid chain', () => {
        bc2.addBlock('600');
        bc.replaceChain(bc2.chain)
        expect(bc.chain).toEqual(bc2.chain);
    })

    it('does not replace the chain with one of less or equal length chains', () => {
        bc.addBlock('600');
        bc.replaceChain(bc2.chain)
        expect(bc.chain).not.toEqual(bc2.chain);
    })

})