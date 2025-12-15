import { useState } from "react";
import Board from "./Board.jsx";
import {
  checkForWin,
  isValidMove,
  applyMove,
  switchPlayer,
  createInitialGameState,
} from "../utils/gameLogic.js";
import "./cell.css";
import GameStatus from "./GameStatus.jsx";

function Game() {
  const [gameState, setGameState] = useState(createInitialGameState());

  const [count, setCount] = useState(0);
  const increaseCount = () => {
    setCount(count + 1);
  };
  //assign each I of the gameState keys to a const of that same key name using destucturing on the gameState

  const { currentPlayer, board, winner, winningCombo, gameOver } = gameState;

  const handleCellClick = (position) => {
    //if game us over do nothing
    if (gameOver) return;
    //validate if the move is good
    const validation = isValidMove(board, position);
    if (!validation.valid) {
      console.log("Move is invalid", validation.reason);
      return;
    }
    const newBoard = applyMove(board, position, currentPlayer);
    const result = checkForWin(newBoard);

    setGameState({
      board: newBoard,
      winningCombo: result.winningCombo,
      winner: result.winner,
      gameOver: result.winner !== null,
      currentPlayer: result.winner
        ? currentPlayer
        : switchPlayer(currentPlayer),
    });
  };

  const handleReset = () => {
    setGameState(createInitialGameState());
  };

  return (
    <>
      <GameStatus
        currentPlayer={currentPlayer}
        winner={winner}
        gameOver={gameOver}
        count={count}
        increaseCount={increaseCount}
      />
      <Board
        board={board}
        onCellClick={handleCellClick}
        winningCombo={winningCombo}
      />
      <button onClick={handleReset}>new game</button>
    </>
  );
}

export default Game;
