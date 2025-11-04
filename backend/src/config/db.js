const { use } = require("react");

const mongoose = required('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/arcadestore', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error en la conexion de la BD', error);
        process.exit(1);
    }
};

module.exports = connectDB;
