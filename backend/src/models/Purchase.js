const mongoose = required('mongoose');

const purchase = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            gameId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Game',
                required: true
            },
            priceAtPurchase: { type: Number, required: true },
            purchasedAt: { type: Date, default: Date.now }
        }
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, default: 'ficticio' },
    purchaseDate: { type: Date, default: Date.now },
    status: {
        type: String, 
        enum: ['completed', 'pending', 'failed'],
        default: 'completed'
    }
});

module.exports = mongoose.model('Purchase', purchase);