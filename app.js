const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

main().then((res) => {
  console.log("Connection successful");
})
.catch(err => console.log(err));

async function main(){
  await mongoose.connect('mongodb://127.0.0.1:27017/StayNest');
}

// Index route
app.get("/listings",async (req,res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", {allListings});
});

//Show Route
app.get("/listings/:id", async (req,res)=> {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("./listings/show.ejs", {listing})
})

app.get("/", (req,res) => {
  res.send("Hi, I am root");
});

app.listen("8080",(req,res) => {
  console.log("StayNest is listening to port 8080");
});
