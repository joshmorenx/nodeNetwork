const mongoose = require("mongoose");

// Conexión a la base de datos
const connectDB = async () => {
    try {
        await mongoose
            .connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log("Conectado a MongoDB");
            })
            .catch((error) => {
                console.error("Error al conectar a MongoDB:", error);
            });
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
}

module.exports = connectDB