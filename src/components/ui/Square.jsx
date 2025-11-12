
// Square component: 1 ô của bảng
// Props:
// - value: 'X' | 'O' | null
// - onSquareClick: callback khi người dùng click ô
// - isWinningSquare: boolean, true nếu ô thuộc đường thắng
// - isLosingSquare: boolean, true nếu ô thuộc người thua (dùng để đổi màu chữ)
function Square({value, onSquareClick, isWinningSquare, isLosingSquare}) {
  // Lớp cơ bản: kích thước, font, border
  const baseClasses = "flex items-center justify-center w-20 h-20 text-4xl font-bold border border-gray-400 dark:border-gray-600 -ml-px -mt-px";
  
  // Nếu là ô thắng, thêm background nổi bật
  const winningClasses = isWinningSquare ? " bg-green-300 dark:bg-green-700" : "";
  
  // Nếu là ô của người thua, đổi màu chữ sang đỏ để nhấn mạnh
  let textClasses = "";
  if (isLosingSquare) {
    textClasses = " text-red-500 dark:text-red-400";
  } else {
    textClasses = " dark:text-white";
  }

  return (
    <button 
      className={baseClasses + winningClasses + textClasses} 
      onClick={onSquareClick}
      aria-label={value ? `Square ${value}` : 'Empty square'}
    >
      {value}
    </button>
  );
}

export default Square;