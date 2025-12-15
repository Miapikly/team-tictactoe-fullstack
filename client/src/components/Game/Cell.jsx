function Cell({ value, position, onClick, isWinning }) {
    return (
      <button onClick={onClick} className={value ? "filled" : ""}>
        {value}
      </button>
    );
  }

  export default Cell;
