import { useState } from "react";

function GameStatus({ currentPlayer, winner, gameOver, count: gameCount, increaseCount }) {
  const [count, setCount] = useState(0);
  const increaseStateCount = () => {
    setCount(count + 1);
  }

  if (gameOver) {

    if (winner === "DRAW") {
      return <div className="game-status-over draw">{<h2>It's a draw!</h2>}</div>;
    }
    return (
        <div className={`game-status game over winner-${winner.toLowerCase()}`}>{<h2>{winner} is the winner!</h2>}

        </div>
    );
  }
  return (
    <div className={`game-status active player-${currentPlayer.toLowerCase()}`}>
  <h2>Its {currentPlayer}'s turn!</h2>
    </div>
  );


}

export default GameStatus;
