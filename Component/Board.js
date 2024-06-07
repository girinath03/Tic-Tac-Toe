import React, { useState, useEffect } from 'react';
import '../Css/Board.css';

function Square({ value, onclic }) {
  return (
    <button className="square" onClick={onclic}>
      {value}
    </button>
  );
}

function winnerCheck(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function Board() {
  const [h, setH] = useState(true);
  const [result, setResult] = useState(false);
  const [count, setCount] = useState(9);
  const [squares, setSquare] = useState(Array(9).fill('.'));

  useEffect(() => {
    if (count === 0 && !winnerCheck(squares)) {
      setResult(true);
    }
  }, [count, squares]);

  function handleClick(i) {
    if (squares[i] !== '.') {
      return;
    }
    const copy = squares.slice();
    copy[i] = h ? 'X' : 'O';
    setSquare(copy);
    setH(!h);
    setCount(count - 1);
  }

  const winner = winnerCheck(squares);
  let status = winner ? `Congratulations! Winner is ${winner}` : (result ? "Match has been drawn" : null);

  function handleReset() {
    setSquare(Array(9).fill('.'));
    setH(true);
    setResult(false);
    setCount(9);
  }

  return (
    <div>
      <div className='tb'>
        <div className='b1'>
          <Square value={squares[0]} onclic={() => handleClick(0)} />
          <Square value={squares[1]} onclic={() => handleClick(1)} />
          <Square value={squares[2]} onclic={() => handleClick(2)} />
        </div>
        <div className='b2'>
          <Square value={squares[3]} onclic={() => handleClick(3)} />
          <Square value={squares[4]} onclic={() => handleClick(4)} />
          <Square value={squares[5]} onclic={() => handleClick(5)} />
        </div>
        <div className='b3'>
          <Square value={squares[6]} onclic={() => handleClick(6)} />
          <Square value={squares[7]} onclic={() => handleClick(7)} />
          <Square value={squares[8]} onclic={() => handleClick(8)} />
        </div>
      </div>
      <div className='res'>
        {winner || result ? (
            <>
            <p>{status}</p>
            <button onClick={handleReset} className='res-btn'>Reset</button>
            </>
        ) : null}
        </div>

    </div>
  );
}

export default Board;
