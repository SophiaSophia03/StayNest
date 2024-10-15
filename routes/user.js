const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");


router.get("/signup", (req,res) => {
  res.render("./users/signup.ejs");
})

router.post("/signup", wrapAsync(async(req,res) => {
  try{
    let {username,email,password} = req.body;
  let newUser = new User({
    email,
    username,
  });
  const registeredUser = await User.register(newUser,password );
  req.flash("success", "Welcome!! New user registered successfuly");
  res.redirect("/listings");
  }catch(err){
    req.flash("error", err.message);
    res.redirect("/signup");
  }
}));

router.get("/login", (req,res) => {
  res.render("./users/login.ejs");
});

router.post("/login", passport.authenticate("local",{failureRedirect:"/login", failureFlash:true}), wrapAsync(async(req,res) => {
  req.flash("success","Welcome to StayNest, You logged in successfully");
  res.redirect("/listings");
}))

module.exports = router;




















