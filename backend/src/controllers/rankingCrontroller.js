const Ranking = require('../models/Ranking');
const User = require('../models/User');

const submitScore = async (req, res) => {
  try {
    const { gameId, score, metrics } = req.body;

    const existingRanking = await Ranking.findOne({
      userId: req.user.id,
      gameId
    });

    let ranking;

    if (existingRanking) {
      if (score > existingRanking.score) {
        existingRanking.score = score;
        existingRanking.metrics = { ...existingRanking.metrics, ...metrics };
        existingRanking.playedAt = new Date();
        await existingRanking.save();
        ranking = existingRanking;
      } else {
        ranking = existingRanking;
      }
    } else {
      // Crear nuevo ranking
      ranking = new Ranking({
        userId: req.user.id,
        gameId,
        score,
        metrics
      });
      await ranking.save();
    }

    const populatedRanking = await Ranking.findById(ranking._id)
      .populate('userId', 'fullName')
      .populate('gameId', 'name');

    res.status(201).json(populatedRanking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const getTopRankings = async (req, res) => {
  try {
    const { gameId } = req.params;

    const rankings = await Ranking.find({ gameId })
      .populate('userId', 'fullName')
      .sort({ score: -1 })
      .limit(10);

    res.json(rankings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const getUserRanking = async (req, res) => {
  try {
    const { gameId } = req.params;

    const ranking = await Ranking.findOne({
      userId: req.user.id,
      gameId
    }).populate('gameId', 'name');

    res.json(ranking || { message: 'No hay puntaje registrado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const getUserRankings = async (req, res) => {
  try {
    const rankings = await Ranking.find({ userId: req.user.id })
      .populate('gameId', 'name icon')
      .sort({ playedAt: -1 });

    res.json(rankings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = {
  submitScore,
  getTopRankings,
  getUserRanking,
  getUserRankings
};