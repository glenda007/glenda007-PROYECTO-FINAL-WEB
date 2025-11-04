const Cart = require('../models/Cart');
const Game = require('../models/Game');

const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id })
      .populate('items.gameId', 'name price icon type');

    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
      await cart.save();
    }

    cart.total = cart.items.reduce((total, item) => {
      return total + (item.gameId?.price || 0);
    }, 0);

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const addToCart = async (req, res) => {
  try {
    const { gameId } = req.body;

    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    const existingItem = cart.items.find(item => 
      item.gameId.toString() === gameId
    );

    if (existingItem) {
      return res.status(400).json({ message: 'El juego ya está en el carrito' });
    }

    cart.items.push({ gameId });

    cart.total = cart.items.reduce((total, item) => {
      return total + (item.gameId?.price || game.price);
    }, 0);

    await cart.save();
    
    const populatedCart = await Cart.findById(cart._id)
      .populate('items.gameId', 'name price icon type');
    
    res.json(populatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { gameId } = req.params;

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    cart.items = cart.items.filter(item => 
      item.gameId.toString() !== gameId
    );

    cart.total = cart.items.reduce((total, item) => {
      return total + (item.gameId?.price || 0);
    }, 0);

    await cart.save();
    
    const populatedCart = await Cart.findById(cart._id)
      .populate('items.gameId', 'name price icon type');
    
    res.json(populatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.json({ message: 'Carrito vaciado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
};