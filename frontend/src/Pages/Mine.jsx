import React from 'react';

const Mine = () => {
  // Example state to simulate mined blocks
  const [blocks, setBlocks] = React.useState([]);

  // Function to handle mining (add blocks)
  const handleMine = () => {
    const newBlock = { id: blocks.length + 1, timestamp: new Date().toLocaleString() };
    setBlocks([...blocks, newBlock]);
  };

  return (
    <div className="container">
      <h1>Mine Page</h1>
      <button onClick={handleMine}>Mine Block</button>
      <div>
        {blocks.length > 0 ? (
          <ul>
            {blocks.map((block) => (
              <li key={block.id}>
                Block {block.id} - {block.timestamp}
              </li>
            ))}
          </ul>
        ) : (
          <p>No blocks mined yet.</p>
        )}
      </div>
    </div>
  );
};

export default Mine;
