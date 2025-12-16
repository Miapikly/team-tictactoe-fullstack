// src/App.jsx
import Game from "./components/Game/Game";
import LeaderBoard from "./components/LeaderBoard";

function App() {
    return (
        <div className="app">
            <div className="main-content">
                <Game />
            </div>
            <aside className="sidebar">
                <LeaderBoard />
            </aside>
        </div>
    );
}

export default App;
