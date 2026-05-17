const mongoose = require("mongoose");
const chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

async function main(params) {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
  {
    from: "sada",
    to: "vedaa",
    msg: "what are you doing",
    create_at: new Date(),
  },
  {
    from: "krish",
    to: "sada",
    msg: "how are you",
    create_at: new Date(),
  },
  {
    from: "sangita",
    to: "vedant",
    msg: "i love you vedant",
    create_at: new Date(),
  },
  {
    from: "vedant",
    to: "sangita",
    msg: "love you too",
    create_at: new Date(),
  },
  {
    from: "nagu",
    to: "ved",
    msg: "i am fine",
    create_at: new Date(),
  },
];

chat.insertMany(allChats);
