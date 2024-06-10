import Block from './Block.mjs';
import crypto from 'crypto';

export default class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(
      0,
      '0',
      Date.now(),
      [],
      this.calculateHash(0, '0', Date.now(), []),
    );
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  calculateHash(index, previousHash, timestamp, transactions) {
    return crypto
      .createHash('sha256')
      .update(index + previousHash + timestamp + JSON.stringify(transactions))
      .digest('hex');
  }

  createBlock(transactions) {
    const previousBlock = this.getLatestBlock();
    const newBlock = new Block(
      previousBlock.index + 1,
      previousBlock.hash,
      Date.now(),
      transactions,
      this.calculateHash(
        previousBlock.index + 1,
        previousBlock.hash,
        Date.now(),
        transactions,
      ),
    );
    this.chain.push(newBlock);
    return newBlock;
  }
}
