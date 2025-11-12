function calculateWinner(squares) {
  const n = 3;
  const lines = [];
  for (let row = 0; row < n; row++) {
    const currentRow = [];
    for (let col = 0; col < n; col++) {
      currentRow.push(row * n + col);
    }
    lines.push(currentRow);
  }
  for (let col = 0; col < n; col++) {
    const currentCol = [];
    for (let row = 0; row < n; row++) {
      currentCol.push(row * n + col);
    }
    lines.push(currentCol);
  }
  const diagonal1 = [];
  const diagonal2 = [];
  for (let i = 0; i < n; i++) {
    diagonal1.push(i * (n + 1));
    diagonal2.push((i * n) + (n - 1 - i));
  }
  lines.push(diagonal1);
  lines.push(diagonal2);
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {winner: squares[a], line: lines[i]};
    }
  }
  return null;
}

export { calculateWinner };