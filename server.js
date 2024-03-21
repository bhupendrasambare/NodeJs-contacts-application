const express = require("express");
const errorHandeler = require("./middleware/errorHandeler");
const connectDb = require("./config/dbConnection");
const env = require("dotenv").config();

const app = express();
const port = process.env.PORT || 6000;

connectDb();
app.use(express.json())
app.use("/api/contacts",require("./routes/routes")); 
app.use("/api/users",require("./routes/userRoutes")); 
app.use(errorHandeler);

app.listen(port)