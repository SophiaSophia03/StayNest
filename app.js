const express = require("express");
const app = express();
const mongoose = require("mongoose");

main().then((res) => {
  console.log("Connection successful");
})
.catch(err => console.log(err));

async function main(){
  await mongoose.connect('mongodb://127.0.0.1:27017/StayNest');
}

app.get("/", (req,res) => {
  res.send("Hi, I am root");
});

app.listen("8080",(req,res) => {
  console.log("StayNest is listening to port 8080");
});
