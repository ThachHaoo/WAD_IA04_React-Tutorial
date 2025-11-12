import Square from './Square.jsx';
import { calculateWinner } from '../utils/utils.jsx';

// Board component: chịu trách nhiệm hiển thị trạng thái trò chơi và 3x3 grid
// Props:
// - xIsNext: boolean, true nếu lượt X
// - squares: mảng 9 phần tử ('X'|'O'|null)
// - onPlay(nextSquares): callback gọi khi có nước mới
function Board({xIsNext, squares, onPlay}) {
  // Lấy thông tin thắng (nếu có) từ hàm tiện ích
  const winInfo = calculateWinner(squares);
  let status;
  let loserMark = null;
  // statusClasses dùng để style trạng thái (thắng/hòa/tiếp theo)
  let statusClasses = "mb-4 text-2xl font-semibold text-center";
  
  if (winInfo) {
    // Nếu có người thắng, hiển thị tên và đánh dấu người thua
    status = 'Winner: ' + winInfo.winner;
    loserMark = winInfo.winner === 'X' ? 'O' : 'X';
    statusClasses += " text-green-500 dark:text-green-400";
  } else if (squares.every(square => square !== null)) {
    // Hết ô nhưng không có người thắng -> hòa
    status = 'Result: Draw!';
    statusClasses += " text-yellow-600 dark:text-yellow-400";
  } else {
    // Chưa kết thúc -> hiển thị lượt tiếp theo
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    statusClasses += " dark:text-white";
  }

  // Xử lý click trên một ô
  // Nếu ô đã có giá trị hoặc đã có người thắng thì không làm gì
  function handleClick(i) {
    if (squares[i] || winInfo) {
      return;
    }
    // tạo bản sao của mảng squares để truyền lên cha
    const nextSquares = squares.slice();
    if (xIsNext)
    {
      nextSquares[i] = 'X';
    }
    else 
    {
      nextSquares[i] = 'O';
    }
    // Gọi callback onPlay ở component cha để cập nhật history
    onPlay(nextSquares);
  }

  return (
    <>
      {/* Trạng thái (Winner / Draw / Next player) */}
      <div className={statusClasses}>{status}</div>
      {/* Render grid 3x3: map hàng và cột, truyền props xuống Square */}
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex">
          {[0, 1, 2].map((col) => {
            const squareIndex = row * 3 + col;
            // isWinning: phần tử thuộc đường thắng
            const isWinning = winInfo && winInfo.line.includes(squareIndex);
            // isLosing: phần tử thuộc cho người thua (để style chữ)
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

export default Board; 