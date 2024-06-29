import { useEffect, useState } from 'react';
import { getBlockchain } from '../utilities/api';

const Explorer = () => {
  const [blockchain, setBlockchain] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlockchain = async () => {
      try {
        const response = await getBlockchain();
        setBlockchain(response);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchBlockchain();
  }, []);

  return (
    <div className="container">
      <h1>Explorer Page</h1>
      {error && <p>{error}</p>}
      <div className="blockchain-info">
        <h2>Blockchain Information</h2>
        {blockchain.map((block) => (
          <div key={block.index} className="block">
            <h3>Block #{block.index}</h3>
            <p>Timestamp: {new Date(block.timestamp).toLocaleString()}</p>
            <p>Transactions: {block.transactions.length}</p>
            <p>Hash: {block.hash}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explorer;
