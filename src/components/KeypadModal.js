import React, { useState } from 'react';

const KeypadModal = ({ total, onConfirm, onCancel }) => {
  const [input, setInput] = useState('');

  const handleKeyPress = (key) => {
    if (key === 'C') {
      setInput('');
    } else if (key === '<') {
      setInput(input.slice(0, -1));
    } else if (key === '.' && input.includes('.')) {
      // Prevent multiple decimal points
    } else {
      setInput(input + key);
    }
  };

  const handleConfirm = () => {
    onConfirm(input);
  };

  return (
    <div className="keypad-modal" style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.5)',
      zIndex: 1000
    }}>
      <h3>Enter Cash Received (Total: ${total.toFixed(2)})</h3>
      <div className="display" style={{
        fontSize: '24px',
        marginBottom: '20px',
        padding: '10px',
        border: '1px solid #ccc',
        textAlign: 'right'
      }}>{input || '0.00'}</div>
      <div className="keypad" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', 'C'].map((key) => (
          <button
            key={key}
            onClick={() => handleKeyPress(key)}
            style={{ padding: '20px', fontSize: '18px' }}
          >
            {key}
          </button>
        ))}
        <button
          onClick={() => handleKeyPress('<')}
          style={{ padding: '20px', fontSize: '18px' }}
        >
          ⌫
        </button>
      </div>
      <div className="actions" style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onCancel} style={{ padding: '10px 20px' }}>Cancel</button>
        <button onClick={handleConfirm} style={{ padding: '10px 20px', background: '#4CAF50', color: 'white' }}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default KeypadModal;