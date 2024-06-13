import Redis from 'ioredis';
import { mineBlock, getBlockchain } from './blockchainService.mjs';

const redis = new Redis();

export const broadcastNewBlock = (block) => {
  redis.publish('blockchain', JSON.stringify(block));
};

export const subscribeToBlockchain = (callback) => {
  const subscriber = new Redis();
  subscriber.subscribe('blockchain', () => {
    subscriber.on('message', (channel, message) => {
      if (channel === 'blockchain') {
        const block = JSON.parse(message);
        callback(block);
      }
    });
  });
};

export const synchronizeBlockchain = async () => {
  const blockchain = getBlockchain();
  redis.set('blockchain', JSON.stringify(blockchain));
};

export const initializeNode = () => {
  subscribeToBlockchain(async (block) => {
    await mineBlock(block);
  });
};
