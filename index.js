const express = require("express");
const connDB = require("./config/db");

//Create server
const app = express();

//Connect to DB
connDB();

//Enable express .json
app.use(express.json({ extended: true }));

//Port app
const PORT = process.env.PORT || 4000;

//Import routes
app.use("/api/users", require("./routes/users"));

//Set main page
app.get("/", (req, res) => {
  res.send("Hola");
});

//Run app
app.listen(PORT, () => {
  console.log("Server running!");
});
