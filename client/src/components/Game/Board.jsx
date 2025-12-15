import Cell from "./Cell.jsx";
//import styles from "./cell.css";

function Board({ board, onCellClick, winningCombo }) {
  return (
    <div className="board">
      {board.map((value, index) => (
        <Cell
          value={value}
          position={index}
          key={index}
          onClick={() => onCellClick(index)}
          isWinning={winningCombo?.includes(index)}
        />
      ))}
    </div>
  );
}

export default Board;
