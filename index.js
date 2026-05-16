const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

app.use("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

main().then(() => {
    console.log("connection successfull");
})
.catch((err) => {
    console.log(err);
}); 

async function main(params) {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
}

app.get("/", (req, res) => {
    res.send("sangita i love you");
});

let port = 3000;
app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});