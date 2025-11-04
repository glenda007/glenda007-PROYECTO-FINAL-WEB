const express = require('express');
const {
  submitScore,
  getTopRankings,
  getUserRanking,
  getUserRankings
} = require('../controllers/rankingController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/top/:gameId', getTopRankings);

router.use(auth);
router.post('/submit', submitScore);
router.get('/user/:gameId', getUserRanking);
router.get('/user', getUserRankings);

module.exports = router;