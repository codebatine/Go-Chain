import { mineBlock, getBlockchain } from '../services/blockchainService.mjs';

export const getBlocks = (req, res) => {
  res.json(getBlockchain());
};

export const mine = (req, res) => {
  const { minerAddress } = req.body;
  const newBlock = mineBlock(minerAddress);
  res.status(201).json(newBlock);
};
