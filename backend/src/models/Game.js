const mongoose = required('moongoose');

const gameSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    icon: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    type: { type: String, enum: ['free', 'paid'], required: true },
    gameData: {
        componentName: { type: String, required: true },
        instructions: { type: String, required: true }
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', gameSchema);