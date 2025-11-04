const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
    try {
        const { email, password, fullName } = req.body

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ mesaage: 'El usuario ya existe '});
        }

        user = new User({
            email, 
            password,
            fullName
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.saver();

        const payload = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sing(payload, process.env.JWT_SECRECT, {
            expiresIn: process.env.JWT_EXPIRE
        });

        res.status(201).json({
            token, 
                user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mesaage: 'Error del servidor '});
    }
};

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error){
    console.error(error)
    res.status(500).json({ mesaage: 'Error del servidor' });
    }
};