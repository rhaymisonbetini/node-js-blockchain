const Block = require('../block.js');
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

})
