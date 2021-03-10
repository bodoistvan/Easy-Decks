const mongoose = require("mongoose");
const db = require("./models/index");
const { exists } = require("./models/userModel");
  
const run = async function() {
    await db.User.deleteMany();
    await db.Card.deleteMany();
    await db.Deck.deleteMany();

    process.exit()
}

mongoose
    .connect("mongodb://localhost/easydecks", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Successfully connect to MongoDB."))
    .catch(err => console.error("Connection error", err));

run();
