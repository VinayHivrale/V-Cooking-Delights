require("dotenv").config();
require("express-async-errors");
const connectDB = require("./db/connect");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Routers
const userRouter = require("./routes/user");
const recipeRouter = require("./routes/recipe");
const commentRouter = require("./routes/comment");

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, "client", "build")));

// API Routes
app.use("/api/v1", userRouter);
app.use("/api/v1/recipe", recipeRouter);
app.use("/api/v1/comment", commentRouter);

// Catch-all route: Serve React's index.html for any other routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// Start Server
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

// Function to print unique areas (Optional)
const Recipe = require("./models/Recipe");

async function printUniqueAreas() {
  try {
    const areas = await Recipe.distinct("strArea");
    console.log("Unique Areas:", areas);
  } catch (error) {
    console.error("Error fetching unique areas:", error);
  }
}

// Call the function (if needed)
