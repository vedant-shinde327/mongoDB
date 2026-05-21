const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const chat = require("./models/chat.js");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

async function main(params) {
  await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}

//index route
app.get("/chats", async (req, res) => {
  let chats = await chat.find();
  res.render("index.ejs", { chats });
});

app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/chats", async (req, res, next) => {
  let { from, to, msg } = req.body;
  let newChat = new chat({
    from: from,
    to: to,
    msg: msg,
    create_at: new Date(),
  });
  newChat
    .save()
    .then((res) => {
      console.log("chat was saved");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

app.get("/chats/:id", async (req, res, next) => {
  let { id } = req.params;
  let chats = await chat.findById(id);
  if (!chats) {
    next(new ExpressError(404, "chat not found"));
  }
  res.render("edit.ejs", { chats });
});

app.get("/chats/:id/edit", async (req, res) => {
  try {
    let { id } = req.params;
    let chats = await chat.findById(id);
    res.render("edit.ejs", { chats });
  } catch (err) {
    next(err);
  }
});

app.put("/chats/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedChat = await chat.findByIdAndUpdate(
      id,
      { msg: newMsg },
      { returnDocument: "after" },
    );
    res.redirect("/chats");
  } catch (err) {
    next(err);
  }
});

app.delete("/chats/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let deletedChat = await chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
  } catch (err) {
    next(err);
  }
});

app.get("/", (req, res) => {
  try {
    res.send("sangita i love you");
  } catch(err) {
    res.send("sangita i love you");
  }
});

// err handling middleware
app.use((err, req, res, next) => {
  let { status = 500, msg = "some err occured" } = err;
  res.status(status).send(msg);
});

let port = 3000;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
