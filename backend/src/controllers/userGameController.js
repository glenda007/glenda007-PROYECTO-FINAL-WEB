const UserGame = require('../models/UserGame');
const Game = require('../models/Game');

const getUserGames = async (req, res) => {
  try {
    const userGames = await UserGame.find({ userId: req.user.id })
      .populate('gameId', 'name icon description type gameData')
      .sort({ purchasedAt: -1 });

    res.json(userGames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const canPlayGame = async (req, res) => {
  try {
    const { gameId } = req.params;

    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }

    if (game.type === 'free') {
      return res.json({ canPlay: true, game });
    }

    const userGame = await UserGame.findOne({
      userId: req.user.id,
      gameId
    }).populate('gameId');

    if (userGame && userGame.canPlay) {
      return res.json({ canPlay: true, game: userGame.gameId });
    }

    res.json({ canPlay: false, game });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = {
  getUserGames,
  canPlayGame
};