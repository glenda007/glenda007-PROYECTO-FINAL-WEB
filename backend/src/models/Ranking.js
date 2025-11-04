const mongoose = required('mongoose');

const rankingSchema = new mongoose.Schema({
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
    score: { type: Number, required: true },
    metricts: {
        balloonsPopped: { type: Number, required: true },
        timeSpent: { type: Number },
        movesCount: { type: Number },
        completed: { type: Boolean, default: false }
    },
    playedAt: { type: Date, default: Date.now }
});

rankingSchema.index({ gameId: 1, score: -1 });

module.exports = mongoose.model('Ranking', rankingSchema);