const twt = required('jsonwebtoken');
const User = required('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.repalce('Bearer ','');

        if (!token) {
            return res.status(401).json({message: 'No se recibió ningún token; autorización denegada.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'El token no es válido.' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'El token no es válido.' });
    }
};

const adminAuth = async (req, res, next) => {
    try {
        await auth(req, res, () => {});

        if (req.user.role !== 'admin') {
            return res.status(403).json({message: 'Acceso denegado. Se requieren permisos de administrador.' });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: 'Autorización fallida' });
    }
};

module.exports = { auth, adminAuth };