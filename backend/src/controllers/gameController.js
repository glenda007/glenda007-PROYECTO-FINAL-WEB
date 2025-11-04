const Game = require('..models/Game')

const getGames = async (req, res) => {
    try {
        const { type, category } = req.query
        let filter = { isActive: true };

        if (type) filter.type = type;
        if (category) filter.category = category;

        const games = await Game.find(filter).populate('createdBy', 'fullName');
        res.json(games)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error de servidos'})
    }
};

const getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id).populate('createdBy', 'fullName');

        if (!game) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }

        res.json(game);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const createGame = async (req, res) => {
    try {
        const gameData = {
            ...req.body,
            createdBy: req.user.id
        };

        if (req.file) {
            gameData.icon = `/uploads/${req.file.filename}`;
        }

        const game = new Game(gameData);
        await game.save();

        const populatedGame = await Game.findById(game._id).populated('createdBy', 'fullName');
        res.status(201).json(populatedGame);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const updateGame = async (req, res) => {
    try {
        let gameData = { ...req.body };

        if (req.file) {
            gameData.icon = `/uploads/${req.file.filename}`;
        }

        const game = await Game.findByIdAndUpdate (
            req.params.id,
            gameData,
            { new: true, runValidators: true }
        ) .populate('createdBy', 'fullName');

        if (!game) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }

        res.json(game);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const deleteGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndUpdate (
            req.params.id,
            { iscative: false },
            { new: true }
        );

        if (!game) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }

        res.json({ message: 'Juego eliminado correctamente' });
    } catch (error) {
        console.error(errro);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

module.exports = {
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
};