function Cell({ value, position, onClick, isWinning }) {
    return (
        <button onClick={onClick} className={`cell ${value ? "filled" : ""} player-${value?.toLowerCase()}`}>
            {value}
        </button>
    );
}

export default Cell;
