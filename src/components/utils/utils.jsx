// calculateWinner: kiểm tra board 3x3 xem có đường thắng hay không.
// Input: squares - mảng 9 phần tử ('X'|'O'|null)
// Output: null nếu chưa có thắng, hoặc { winner: 'X'|'O', line: [a,b,c] }
function calculateWinner(squares) {
  const n = 3; // kích thước board (3x3)
  const lines = [];

  // Thêm tất cả hàng (rows)
  for (let row = 0; row < n; row++) {
    const currentRow = [];
    for (let col = 0; col < n; col++) {
      currentRow.push(row * n + col);
    }
    lines.push(currentRow);
  }

  // Thêm tất cả cột (columns)
  for (let col = 0; col < n; col++) {
    const currentCol = [];
    for (let row = 0; row < n; row++) {
      currentCol.push(row * n + col);
    }
    lines.push(currentCol);
  }

  // Thêm hai đường chéo
  const diagonal1 = [];
  const diagonal2 = [];
  for (let i = 0; i < n; i++) {
    // diagonal1: 0, 4, 8 (i * (n + 1))
    diagonal1.push(i * (n + 1));
    // diagonal2: 2, 4, 6 (i*n + (n-1-i))
    diagonal2.push((i * n) + (n - 1 - i));
  }
  lines.push(diagonal1);
  lines.push(diagonal2);

  // Kiểm tra từng đường xem có 3 ô cùng ký tự hay không
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {winner: squares[a], line: lines[i]};
    }
  }

  // Không có người thắng
  return null;
}

export { calculateWinner };