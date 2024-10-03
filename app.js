const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.get("/", (req,res) => {
  res.send("Hi, I am root");
});

app.listen("8080",(req,res) => {
  console.log("StayNest is listening to port 8080");
});
