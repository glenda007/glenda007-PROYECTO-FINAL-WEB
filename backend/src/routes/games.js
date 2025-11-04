const express = require('express');
const {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame
} = require('../controllers/gameController');
const { auth, adminAuth } = require('../middleware/auth');
const { validateGame } = require('../middleware/validation');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getGames);
router.get('/:id', getGameById);

router.post('/', auth, adminAuth, upload.single('icon'), validateGame, createGame);
router.put('/:id', auth, adminAuth, upload.single('icon'), validateGame, updateGame);
router.delete('/:id', auth, adminAuth, deleteGame);

module.exports = router;