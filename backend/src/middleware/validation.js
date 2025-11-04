const validateGame = (req, res, next) => {
    const { name, description, price, category, type } = req.body;

    if (!name || !description || !price || !category || !type) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    if (type !== 'free' && type !== 'paid') {
        return res.status(400).json({ message: 'El tipo debe ser free o paid' });
    }

    next();
}; 

const validaterUser = (req, res, next) => {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
        return res.status(400).json({ mesaage: 'La contraseña debe tener al menos 6 caracteres'});
    }

    next();
};

module.exports = { validateGame, validateUser }