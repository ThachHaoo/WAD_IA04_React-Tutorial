import {useState} from 'react';
import Board from './components/ui/Board.jsx'; 

// Component chính Game
// - Quản lý history của các nước đi
// - Điều khiển lượt chơi hiện tại, thứ tự hiển thị danh sách nước đi
// - Truyền props cần thiết xuống `Board` và xử lý các callback
function Game() {
  // history: mảng các trạng thái board (mỗi phần tử: { squares: [...], location })
  const [history, setHistory] = useState([ { squares: Array(9).fill(null), location: null } ]);
  // currentMove: index của history đang được hiển thị
  const [currentMove, setCurrentMove] = useState(0);
  // isAscending: hiển thị danh sách nước đi theo thứ tự tăng hay giảm
  const [isAscending, setIsAscending] = useState(true);
  // xIsNext: người chơi tiếp theo là X khi currentMove chẵn
  const xIsNext = (currentMove % 2) === 0;
  // currentSquares: trạng thái board hiện tại (mảng 9 phần tử)
  const currentSquares = history[currentMove].squares;

  // handlePlay: được gọi khi `Board` báo có nước đi mới
  // nextSquares: mảng mới sau khi chơi
  function handlePlay(nextSquares) {
    // tìm index đã thay đổi so với trạng thái hiện tại
    const oldSquares = history[currentMove].squares;
    let clickedIndex = -1;
    for (let i = 0; i < nextSquares.length; i++) {
      if (oldSquares[i] !== nextSquares[i]) {
        clickedIndex = i;
        break;
      }
    }

    // tạo entry mới chứa squares và vị trí vừa đánh
    const nextHistoryEntry = { squares: nextSquares, location: clickedIndex };
    // cắt history tới currentMove (nếu người dùng đã nhảy lại rồi đánh new move)
    const nextHistory = [...history.slice(0, currentMove + 1), nextHistoryEntry];
    
    setHistory(nextHistory);
    // chuyển currentMove tới cuối history mới
    setCurrentMove(nextHistory.length - 1);
  }

  // jumpTo: nhảy tới một nước bất kỳ trong lịch sử
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // toggle thứ tự sắp xếp danh sách nước đi
  function handleSortToggle() {
    setIsAscending(!isAscending);
  }

  // Tạo danh sách các nút để nhảy tới từng nước (history)
  const moves = history.map((historyEntry, move) => {
    const location = historyEntry.location;
    let description;

    // Nếu là nước hiện tại thì hiển thị trạng thái đặc biệt
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

    // Thông tin vị trí hiển thị cho các nút khác
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

  // sắp xếp danh sách nếu cần  
  const sortedMoves = isAscending ? moves : moves.slice().reverse();

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-8 bg-linear-to-br from-cyan-400 to-blue-600 dark:from-slate-800 dark:to-blue-950">
      <div className="w-full max-w-4xl p-6 bg-white rounded-xl shadow-2xl sm:p-8 dark:bg-gray-800">
        <h1 className="text-5xl font-bold text-center mb-8 py-4 px-6 text-white bg-linear-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 rounded-lg shadow-md">
          Tic Tac Toe
        </h1>
        <div className="flex flex-col items-center md:flex-row md:items-start md:justify-center">
          <div className="mb-8 md:mb-8 md:mr-10">
            {/* Truyền trạng thái và callback xuống Board */}
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          </div>
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

export default Game;