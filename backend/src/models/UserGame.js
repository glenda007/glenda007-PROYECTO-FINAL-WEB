const mongoose = require('mongoose');

const userGameSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  gameId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Game', 
    required: true 
  },
  purchasedAt: { type: Date, default: Date.now },
  purchaseId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Purchase' 
  },
  canPlay: { type: Boolean, default: true }
});

userGameSchema.index({ userId: 1, gameId: 1 }, { unique: true });

module.exports = mongoose.model('UserGame', userGameSchema);