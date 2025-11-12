import {useState} from 'react';
import Board from './components/ui/Board'; 


function Game() {
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
          <span className="px-4 py-1 text-white bg-gray-500 rounded-md dark:bg-gray-400">
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
          className="px-4 py-1 text-white bg-blue-400 rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    )
  });

  const sortedMoves = isAscending ? moves : moves.slice().reverse();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100 md:flex-row md:items-start dark:bg-gray-900">
      <div className="mb-8 md:mb-0 md:mr-10">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="text-lg dark:text-gray-200">
        <button
          className="px-4 py-1 mb-4 text-white bg-gray-600 rounded-md hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800"
          onClick={handleSortToggle}
        >
          Sort: {isAscending ? 'Ascending' : 'Descending'}
        </button>
        <ol className="pl-6 list-decimal">{sortedMoves}</ol>
      </div>
    </div>
  );
}

export default Game;