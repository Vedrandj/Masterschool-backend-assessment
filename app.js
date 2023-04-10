const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const photoRoutes = require("./routes/photoRoutes");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.status(200).json("Welcome to the Unsplash API!");
});

app.use("/api/photos", photoRoutes);

app.listen(PORT, () => {
  console.log(`Listening on PORT 3000`);
});
