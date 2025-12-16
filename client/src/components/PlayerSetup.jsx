import { useState } from "react";

export default function PlayerSetup({ onPlayerSet }) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [existingPlayer, setExistingPlayer] = useState(null);

    const checkExistingPlayer = async (name) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/players/name/${name}`
            );
            const data = await response.json();

            if (data.success) {
                setExistingPlayer(data.player);
            } else {
                setExistingPlayer(null);
            }
        } catch (err) {
            setExistingPlayer(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!name.trim()) {
            setError("Please enter your name");
            return;
        }

        setLoading(true);

        if (existingPlayer != null) {
            localStorage.setItem("playerId", existingPlayer.id);
            localStorage.setItem("playerName", existingPlayer.name);

            onPlayerSet(existingPlayer);
            setLoading(false);

            return;
        }

        try {
            const data = await (
                await fetch("http://localhost:3000/api/players", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: name.trim() }),
                })
            ).json();

            if (data.success) {
                localStorage.setItem("playerId", data.player.id);
                localStorage.setItem("playerName", data.player.name);

                onPlayerSet(data.player);

                console.log("Player created: ", data.player);
            } else {
                setError(data.error || "Failed to create player");
            }
        } catch (err) {
            console.error("Error creating player\n", err);
            setError(
                "Could not connect to server. Make sure backend is running."
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="player-setup">
            <div className="player-setup-card">
                <h2>Welcome to Tic-Tac-Toe!</h2>
                <p className="subtitle">Enter your name to start playing.</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="player-form">
                    <div className="form-group">
                        <label htmlFor="playerName">Player Name</label>
                        <input
                            id="playerName"
                            type="text"
                            placeholder="Enter your name..."
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (e.target.value.trim().length > 2)
                                    checkExistingPlayer(e.target.value.trim());
                            }}
                            disabled={loading}
                            className="player-input"
                            autoFocus
                        />

                        {existingPlayer && (
                            <div className="existing-player-info">
                                <p>Welcome back {existingPlayer.name}!</p>
                                <p className="stats">
                                    Wins: {existingPlayer.wins} | Losses:{" "}
                                    {existingPlayer.losses} | Ties:{" "}
                                    {existingPlayer.ties}
                                </p>
                                <p className="info-text">
                                    Click Start Game to continue
                                </p>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !name.trim()}
                        className="btn btn-primary"
                    >
                        {loading ? "Creating Player..." : "Start Game"}
                    </button>
                </form>

                <div className="help-text">
                    <p>Play against yourself or a friend!</p>
                    <p>Your wins and losses will be tracked.</p>
                </div>
            </div>
        </div>
    );
}
