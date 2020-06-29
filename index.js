require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Import Routes
const authRoute = require("./routes/auth")

//Connect to database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => {
  console.log("Database connection: [ERROR] \n" + error);
});
db.once("open", () => console.log("Database connection: [OK]"));

// Middleware
app.use(express.json())

// Route middlewares
app.use("/api/user", authRoute)

app.listen(3333, () => console.log("Server: [Ok]"));
