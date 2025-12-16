import Cell from "./Cell.jsx";
function Board({ board, onCellClick, winningCombo }) {
    return (
        <div className="board">
            {board.map((value, index) => (
                <Cell
                    key={index}
                    position={index}
                    value={value}
                    onClick={() => onCellClick(index)}
                    isWinning={winningCombo?.includes(index)}
                />
            ))}
        </div>
    );
}

export default Board;
