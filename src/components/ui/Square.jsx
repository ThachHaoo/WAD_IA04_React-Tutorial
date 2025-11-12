
function Square({value, onSquareClick, isWinningSquare, isLosingSquare}) {
  const baseClasses = "flex items-center justify-center w-20 h-20 text-4xl font-bold border border-gray-400 dark:border-gray-600 -ml-px -mt-px";
  
  const winningClasses = isWinningSquare ? " bg-green-300 dark:bg-green-700" : "";
  
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
    >
      {value}
    </button>
  );
}

export default Square;