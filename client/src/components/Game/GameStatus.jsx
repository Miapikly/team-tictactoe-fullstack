import { useState } from "react";

function GameStatus({ currentPlayer, winner, gameOver, increaseCount }) {
    const [count, setCount] = useState(0);
    if (gameOver) {
        if (winner === "DRAW") {
            return (
                <div className="game-status draw">
                    <h2>It's a draw.</h2>
                </div>
            );
        }

        return (
            <div
                className={`game-status game-over winner-${winner.toLowerCase()}`}>
                <h2>{winner} is the winner!</h2>
            </div>
        );
    }
    return (
        <div className={`game-status active player-${currentPlayer.toLowerCase()}`}>
            <h2>Player {currentPlayer}'s turn.</h2>
        </div>
    );
}

export default GameStatus;
