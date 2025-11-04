const express = require('express');
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', getCart);
router.post('/add', addToCart);
router.delete('/remove/:gameId', removeFromCart);
router.delete('/clear', clearCart);

module.exports = router;