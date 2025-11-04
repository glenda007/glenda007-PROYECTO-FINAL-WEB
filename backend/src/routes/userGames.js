const express = require('express');
const {
  getUserGames,
  canPlayGame
} = require('../controllers/userGameController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', getUserGames);
router.get('/can-play/:gameId', canPlayGame);

module.exports = router;