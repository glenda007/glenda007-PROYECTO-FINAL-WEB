const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const UserGame = require('../models/UserGame');
const Game = require('../models/Game');

const createPurchase = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id })
      .populate('items.gameId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'El carrito está vacío' });
    }

    for (let item of cart.items) {
      const game = await Game.findById(item.gameId._id);
      if (!game || !game.isActive) {
        return res.status(400).json({ 
          message: `El juego "${item.gameId.name}" no está disponible` 
        });
      }
    }

    const totalAmount = cart.items.reduce((total, item) => {
      return total + item.gameId.price;
    }, 0);

    const purchase = new Purchase({
      userId: req.user.id,
      items: cart.items.map(item => ({
        gameId: item.gameId._id,
        priceAtPurchase: item.gameId.price
      })),
      totalAmount,
      paymentMethod: 'ficticio'
    });

    await purchase.save();
    const userGames = cart.items.map(item => ({
      userId: req.user.id,
      gameId: item.gameId._id,
      purchaseId: purchase._id
    }));

    await UserGame.insertMany(userGames);

    cart.items = [];
    cart.total = 0;
    await cart.save();

    const populatedPurchase = await Purchase.findById(purchase._id)
      .populate('items.gameId', 'name icon')
      .populate('userId', 'fullName email');

    res.status(201).json(populatedPurchase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const getUserPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({ userId: req.user.id })
      .populate('items.gameId', 'name icon type')
      .sort({ purchaseDate: -1 });

    res.json(purchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findOne({
      _id: req.params.id,
      userId: req.user.id
    }).populate('items.gameId', 'name icon type description');

    if (!purchase) {
      return res.status(404).json({ message: 'Compra no encontrada' });
    }

    res.json(purchase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = {
  createPurchase,
  getUserPurchases,
  getPurchaseById
};