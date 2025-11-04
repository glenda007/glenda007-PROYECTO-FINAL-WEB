const express = require('express');
const {
  createPurchase,
  getUserPurchases,
  getPurchaseById
} = require('../controllers/purchaseController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.post('/', createPurchase);
router.get('/', getUserPurchases);
router.get('/:id', getPurchaseById);

module.exports = router;