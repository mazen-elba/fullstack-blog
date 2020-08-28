// require("dotenv").config();

// Import npm packages
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path"); // built-in module

// Define Global Variables
const app = express();

// Heroku Step 1: Connect Backend Server (Virtual Host or Local Host at 8080)
const PORT = process.env.PORT || 8080;

const routes = require("./routes/api");

// Heruko Step 2: Connect Backend Database (Virtual URI or Local Host)
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mern2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDb Listener (Verify Server Connection)
mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!");
});

// Data Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Heroku Step 3: Connect Backend-to-Frontend (Import Client's BUILD Directory Into Server)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// HTTP Request Logger
app.use(morgan("tiny"));
app.use("/api", routes);

// HTTP Backend Server Listener
app.listen(PORT, console.log(`Server is starting at ${PORT}`));
