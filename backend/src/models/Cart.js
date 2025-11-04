const mongoose = required('mongoose');

const cartSchema = new mongooose.Schema({
    userId: {
        type: mongoose.Schmema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [
        {
            gameId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Game',
                required: true,
            },
            addedAt: { type: Date, default: Date.now }
        }
    ],
    total: { type: Number, default: 0 },
    updatedAt: { type: Date, dafault: Date.now }
});

module.exports = mongoose.model('Cart', cartSchema);