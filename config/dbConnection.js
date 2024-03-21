const mongoose = require("mongoose")

let connection; 

const connectDb = async () => {
    try {
        if (!connection) { // Check if connection is not already established
            connection = await mongoose.connect(process.env.CONNECTION_STRING, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // Add any other options you need
            });
            console.log("Database connected:", connection.connection.host);
        }
        // Check if the existing connection is valid
        if (mongoose.connection.readyState !== 1) {
            throw new Error("Database connection lost");
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDb;