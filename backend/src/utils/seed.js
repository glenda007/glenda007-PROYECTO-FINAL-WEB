require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Game = require('../models/Game');
const connectDB = require('../config/db');

const seedData = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Game.deleteMany({});

    console.log('Colecciones limpiadas...');

    const hashedPassword = await bcrypt.hash('admin123', 12);
    const admin = await User.create({
      email: 'admin@arcadestore.com',
      password: hashedPassword,
      fullName: 'Administrador ARCADESTORE',
      role: 'admin'
    });

    console.log('Administrador creado:', admin.email);

    const games = await Game.create([
      {
        name: 'Balloon Pop',
        description: 'Revienta la mayor cantidad de globos en 30 segundos',
        price: 0,
        category: 'arcade',
        icon: '/images/balloon-pop.png',
        type: 'free',
        gameData: {
          componentName: 'BalloonGame',
          instructions: 'Haz clic en los globos para reventarlos. Tienes 30 segundos.'
        },
        createdBy: admin._id
      },
      {
        name: 'Puzzle Challenge',
        description: 'Armar el rompecabezas con la menor cantidad de movimientos',
        price: 80.00,
        category: 'puzzle',
        icon: '/images/puzzle-game.png',
        type: 'paid',
        gameData: {
          componentName: 'PuzzleGame',
          instructions: 'Mueve las piezas contiguas al espacio vacío para completar el puzzle.'
        },
        createdBy: admin._id
      }
    ]);

    console.log('Juegos creados:');
    games.forEach(game => {
      console.log(`   - ${game.name} (${game.type}) - Q${game.price}`);
    });

    console.log('Datos iniciales creados exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('Error creando datos iniciales:', error);
    process.exit(1);
  }
};

seedData();