import {useState} from 'react';
import Board from './components/ui/Board.jsx'; 

export default function Game() {
  const [history, setHistory] = useState([ { squares: Array(9).fill(null), location: null } ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = (currentMove % 2) === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares) {
    const oldSquares = history[currentMove].squares;
    let clickedIndex = -1;
    for (let i = 0; i < nextSquares.length; i++) {
      if (oldSquares[i] !== nextSquares[i]) {
        clickedIndex = i;
        break;
      }
    }

    const nextHistoryEntry = { squares: nextSquares, location: clickedIndex };
    const nextHistory = [...history.slice(0, currentMove + 1), nextHistoryEntry];
    
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handleSortToggle() {
    setIsAscending(!isAscending);
  }

  const moves = history.map((historyEntry, move) => {
    const location = historyEntry.location;
    let description;

    if (move === currentMove) {
      const row = Math.floor(location / 3);
      const col = location % 3;
      description = `You are at move #${move} (${row}, ${col})`;
      if (move === 0) {
        description = 'You are at game start';
      }

      return (
        <li key={move} className="mb-2">
          <span className="px-4 py-1 text-gray-800 bg-gray-300 rounded-md dark:bg-gray-400 dark:text-gray-900">
            {description}
          </span>
        </li>
      )
    }

    if (move > 0) {
      const row = Math.floor(location / 3);
      const col = location % 3;
      description = `Go to move #${move} (${row}, ${col})`;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move} className="mb-2">
        <button 
          className="px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    )
  });

  const sortedMoves = isAscending ? moves : moves.slice().reverse();

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-8 bg-linear-to-br from-cyan-400 to-blue-600 dark:from-slate-800 dark:to-blue-950">
      <div className="w-full max-w-4xl p-6 bg-white rounded-xl shadow-2xl sm:p-8 dark:bg-gray-800">
        <h1 className="text-5xl font-bold text-center mb-8 py-4 px-6 text-white bg-linear-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 rounded-lg shadow-md">
          Tic Tac Toe
        </h1>
        <div className="flex flex-col items-center md:flex-row md:items-start md:justify-center">
          <div className="mb-8 md:mb-0 md:mr-10">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          </div>

          {/* Cột 2: Game Info (Lịch sử) */}
          <div className="text-lg text-gray-900 dark:text-gray-100">
            <button
              className="px-4 py-1 mb-4 text-white bg-gray-600 rounded-md hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800"
              onClick={handleSortToggle}
            >
              Sort: {isAscending ? 'Ascending' : 'Descending'}
            </button>
            <ol className="pl-6 list-decimal">{sortedMoves}</ol>
          </div>

        </div>
      </div> 
    </div> 
  );
}