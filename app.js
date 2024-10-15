const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash =  require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js")

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

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

const sessionOptions = {
  secret: "mysecretcode",
  resave:false,
  saveUninitialized:true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly:true
  }
}

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/demouser", async(req,res) => {
  let fakeUser = new User({
  email: "abc@gmail.com",
  username: "user_abc",
});
  let registeredUser = await User.register(fakeUser,"abcdefg" );
  res.send(registeredUser);
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

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
