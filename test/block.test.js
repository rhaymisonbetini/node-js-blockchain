const Block = require('../blockchain/block.js');
const { it, expect } = require('@jest/globals');


describe('Block', () => {

    beforeEach(() => {
        data = 'arquivo.bin';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    })

    it('sets the `data` to macth the input', () => {
        expect(block.data).toEqual(data);
    })

    it('sets the `lastHash` to match the hash od the last block', () => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    })

    it('generates hash tath matches the difficulty hash', () => {
        expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
    })

    it('lowers the difficulty for slowly mined blocks', () => {
        expect(Block.adjustDifficulty(block, block.timestamp + 360000)).toEqual(block.difficulty - 1);
    })

    it('increments the difficulty for quicly mined blocks', () => {
        expect(Block.adjustDifficulty(block, block.timestamp + 1)).toEqual(block.difficulty + 1);
    })

})
