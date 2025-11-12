import Square from './Square.jsx';
import { calculateWinner } from '../utils/utils.jsx';

export default function Board({xIsNext, squares, onPlay}) {
  const winInfo = calculateWinner(squares);
  let status;
  let loserMark = null;
  let statusClasses = "mb-4 text-2xl font-semibold text-center";
  
  if (winInfo) {
    status = 'Winner: ' + winInfo.winner;
    loserMark = winInfo.winner === 'X' ? 'O' : 'X';
    statusClasses += " text-green-500 dark:text-green-400";
  } else if (squares.every(square => square !== null)) {
    status = 'Result: Draw!';
    statusClasses += " text-yellow-600 dark:text-yellow-400";
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    statusClasses += " dark:text-white";
  }

  function handleClick(i) {
    if (squares[i] || winInfo) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext)
    {
      nextSquares[i] = 'X';
    }
    else 
    {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  return (
    <>
      <div className={statusClasses}>{status}</div>
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex">
          {[0, 1, 2].map((col) => {
            const squareIndex = row * 3 + col;
            const isWinning = winInfo && winInfo.line.includes(squareIndex);
            const isLosing = winInfo && squares[squareIndex] === loserMark;
            return (
              <Square
                key={squareIndex}
                value={squares[squareIndex]}
                onSquareClick={() => handleClick(squareIndex)}
                isWinningSquare={isWinning}
                isLosingSquare={isLosing}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}