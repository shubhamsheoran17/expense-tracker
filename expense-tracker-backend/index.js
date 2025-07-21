const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const transactionRoute = require("./routes/transactionRoute");



const connectionDB = require("./config/connection");
connectionDB(); 


// Middleware
app.use(cors());
app.use(express.json());



app.use("/api/user" , userRoute);
app.use("/api/category" , categoryRoute);
app.use("/api/transaction" , transactionRoute);



const port = process.env.PORT || 3000;
app.listen(port , () => {
    console.log(`Server is running on ${port}`)
})