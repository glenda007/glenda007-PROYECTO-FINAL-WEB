const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/games');
const cartRoutes = require('./routes/cart');
const purchaseRoutes = require('./routes/purchases');
const rankingRoutes = require('./routes/rankings');
const userGameRoutes = require('./routes/userGames');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/rankings', rankingRoutes);
app.use('/api/user-games', userGameRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'ARCADESTORE API is running!',
    timestamp: new Date().toISOString()
  });
});

app.use(errorHandler);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

module.exports = app;