import express from "express";

const app = express();
const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  return res.send("Welcome to Zenbucks Cafe!");
});
