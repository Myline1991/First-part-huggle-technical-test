// importation de modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//
var corsOptions = {
  origin: "https://localhost:3000"
};
app.use(cors(corsOptions));

// configuration du body Parser
// parse requests of content-type - application json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// méthode connect()
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to milyne application."})
});

// démarrage du serveur express -- set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`Press CTRL + C to stop\n`);
});
