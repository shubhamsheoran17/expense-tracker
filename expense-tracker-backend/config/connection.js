const mongoose = require("mongoose");
require("dotenv").config();


const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDb Database successfully connected")
    } catch (error) {
        console.error("Error in connecting database: ", err.message);
        process.exit(1); // Exit process with failure
    }
}


module.exports = connectionDB;