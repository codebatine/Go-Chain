export default class Block {
  constructor(index, previousHash, timestamp, transactions, hash) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.hash = hash;
  }
}
