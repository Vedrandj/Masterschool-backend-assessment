import express from "express";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req,res) =>{
  res.status(200).json("Welcome to the Unsplash API!");
})

app.listen(PORT, () =>{
  console.log(`Listening on PORT 3000`);
})
