import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from 'react';
import Game from "./components/Game/Game.jsx";


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/tictactoe">Tic-Tac-Toe</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/tictactoe" element={<Game />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;