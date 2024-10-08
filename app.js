const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");


app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

main()
  .then((res) => {
    console.log("Connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/StayNest");
}

// Index route
app.get("/listings", wrapAsync( async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
}));

//New Route
app.get("/listings/new", (req, res) => {
  res.render("./listings/new.ejs");
});

//Create Route
app.post(
  "/listings",
  wrapAsync(async (req, res, next) => {
    if(!req.body.listing){
      throw new ExpressError(400, "Send valid data for listing");
    }
      const newListing = new Listing(req.body.listing);
      await newListing.save();
      res.redirect("/listings");
  })
);

//Show Route
app.get("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("./listings/show.ejs", { listing });
}));

//Edit Route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("./listings/edit.ejs", { listing });
}));

//Update Route
app.put("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, req.body.listing, {
    new: true,
    runValidators: true,
  });
  res.redirect(`/listings/${id}`);
}));

// Delete Route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id, req.body.listing);
  res.redirect(`/listings`);
}));

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.all("*", (req,res,next) => {
  next(new ExpressError(404, "Page not found" ))
})

app.use((err, req, res, next) => {
  let{status = 500,message = "Something went wrong"} = err;
  res.render("error.ejs", {err})
});

app.listen("8080", (req, res) => {
  console.log("StayNest is listening to port 8080");
});
