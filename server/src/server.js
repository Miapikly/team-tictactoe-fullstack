// server/src/server.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import {
    // List of main functions
    // from playerService.js
    createPlayer,
    getPlayer,
    getAllPlayers,
    updatePlayerStats, // New
    getLeaderboard,    // New
    getPlayerByName    // New
} from './services/playerService.js';

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(core({
    origin: NODE_ENV === 'production'
        ? process.env.CLIENT_URL
        : 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Logging middleware / record dtails about req res
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// ==========================================
// ROUTES
// ==========================================

// Health check???
app.get('/', (req, res) => {
    res.json({
        message: 'Tic-Tac-Toe API',
        version: '1.0.0',
        status: 'running'
    });
});

// ==========================================
// PLAYER ROUTES
// ==========================================

// POST /api/players
// Crete new player

app.post('/api/players', (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Name is required'
            });
        }

        const player = createPlayer(name.trim());

        if (player.error) {
            return res.status(player.status).json({
                success: false,
                error: player.error
            });
        }

        res.status(201).json({
            success: true,
            player
        });
    } catch (error) {
        console.error('Error creating player', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create player'
        });
    }
});

/**
 * GET /api/players/:id
 * Get player by ID
 */

app.get("/api/players/:id", (req, res) => {
    try {
        const players = getAllPlayers();
        res.json({
            success: true,
            players,
            cound: players.length
        });
    } catch (error) {
        console.error(
            "Error getting players:", error);
        res.status(500).json({
            success: false,
            error: 'Failed to get players'
        });
    }
});

/**
 * GET /api/players/:id
 * Get player by ID
 */

app.get('/api/players/:id', (req, res) => {
    try {
        const player = getPlayer(req.params.id);

        if (player.error) {
            return res.status(player.status).json({
                success: false,
                error: player.error
            });
        }

        res.json({
            success: true,
            player
        });
    } catch (error) {
        console.error('Error getting player:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get player'
        });
    }
});

/**
 * POST /api/players/:id/stats
 * Update player stats after a game
 */

app.post('/api/players/:id/stats', (req, res) => {
    try {
        const { result } = req.body;

        if (!result || !['win', 'loss', 'tie'].includes(result)) {
            return res.status(400).json({
                success: false,
                error: "Result must be 'win', 'loss', or 'tie'"
            });
        }

        const player = udpatePlayerStats(req.params.id, result);

        if (player.error) {
            return res.status(player.status).json({
                success: false,
                error: player.error
            });
        }

        res.json({
            success: true,
            player,
            message: `Player stats updated ${result}`
        });
    } catch (error) {
        console.error("Error updating stats:", error);
        res.status(500).json({
            success: false,
            error: "Failed to update player stats"
        });
    }
});

/**
 * GET /api/leaderboard
 * Get top players by wins
 */