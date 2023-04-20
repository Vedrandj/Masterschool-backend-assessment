const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const photoRoutes = require("./routes/photoRoutes");
const userRoutes = require("./routes/userRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.status(200).json("Welcome to the Unsplash API!");
});

app.use("/api/photos", photoRoutes);
app.use("/api/users", userRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on PORT 3000`);
});
