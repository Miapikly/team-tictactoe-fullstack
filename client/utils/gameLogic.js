const WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export function checkForWin(board) {
    for (const combo of WINNING_COMBINATION) {
        const [a, b, c] = combo;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return {
                winner: board[a],
                winningCombo: combo,
            };
        }
    }

    if (board.every((cell) => cell !== null)) {
        return { winner: "DRAW", winningCombo: null };
    }

    return {
        winner: null,
        winningCombo: null,
    };
}

export function isValidMove(board, position) {
    // position must be 0-8
    if (!(position >= 0 && position <= 8) || isNaN(position)) {
        return { valid: false, reason: "Please select 1-9" };
    }

    // position must be empty
    if (board[position] !== null) {
        return { valid: false, reason: "Position taken, pick another spot." };
    }

    // success
    return { valid: true };
}

export function switchPlayer(currentPlayer) {
    return currentPlayer === "X" ? "O" : "X";
}

export function createInitialGameState() {
    return {
        currentPlayer: "X",
        board: Array(9).fill(null),
        BOARD_WIDTH: 3,
        gameOver: false,
        winner: null,
        winningCombo: null,
        plays: 0,
    };
}

export function applyMove(board, position, player) {
    const newBoard = [...board];
    newBoard[position] = player;
    return newBoard;
}
