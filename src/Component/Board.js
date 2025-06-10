import { useState, useEffect } from 'react';
import '../Css/Board.css';

function Square({ value, onClick, isWinning }) {
  return (
    <button 
      className={`square ${value} ${isWinning ? 'winning-square' : ''}`} 
      onClick={onClick}
    >
      {value !== '.' ? value : ''}
    </button>
  );
}
  
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]             
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] !== '.' && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winningSquares: lines[i]
      };
    }
  }
  return null;
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill('.'));
  const [isXNext, setIsXNext] = useState(true);
  const [history, setHistory] = useState([]);
  const [movesLeft, setMovesLeft] = useState(9);

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.winner;
  const isDraw = movesLeft === 0 && !winner;

  useEffect(() => {
    if (movesLeft === 0 && !winner) {
      // Draw condition handled in render
    }
  }, [movesLeft, winner]);

  const handleClick = (i) => {
    if (squares[i] !== '.' || winner || isDraw) return;
    
    const newSquares = squares.slice();
    newSquares[i] = isXNext ? 'X' : 'O';
    
    setSquares(newSquares);
    setIsXNext(!isXNext);
    setMovesLeft(movesLeft - 1);
    setHistory([...history, { squares: [...squares], player: isXNext ? 'X' : 'O' }]);
  };

  const handleReset = () => {
    setSquares(Array(9).fill('.'));
    setIsXNext(true);
    setMovesLeft(9);
    setHistory([]);
  };

 const handleUndo = () => {
  if (history.length === 0) return;
  
  const lastState = history[history.length - 1];
  setSquares(lastState.squares);
  setIsXNext(lastState.player === 'X'); // Changed from 'O' to 'X'
  setMovesLeft(9 - history.length + 1);
  setHistory(history.slice(0, -1));
};

  const renderSquare = (i) => {
    const isWinning = winnerInfo?.winningSquares.includes(i);
    return (
      <Square
        value={squares[i]}
        onClick={() => handleClick(i)}
        isWinning={isWinning}
      />
    );
  };

  let status;
  if (winner) {
    status = `Player ${winner} wins! 🎉`;
  } else if (isDraw) {
    status = `Congrats for both! The game is DRAWN.`;
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game-container">
      <h1 className="game-title">Tic Tac Toe</h1>
      <div className="status">{status}</div>
      
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      
      <div className="controls">
        <button onClick={handleReset} className="control-btn reset-btn">New Game</button>
        <button 
          onClick={handleUndo} 
          className="control-btn undo-btn"
          disabled={history.length === 0}
        >
          Undo Move
        </button>
      </div>
    </div>
  );
}

export default Board;