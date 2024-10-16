const User = require("../models/user.js");

module.exports.signUp = (req,res) => {
  res.render("./users/signup.ejs");
};

module.exports.signUpUser = async(req,res, next) => {
  try{
    let {username,email,password} = req.body;
  let newUser = new User({
    email,
    username,
  });
  const registeredUser = await User.register(newUser,password );
  req.login(registeredUser, (err) => {
    if(err){
      next(err);
    }
    req.flash("success", "Welcome!! New user registered successfuly");
    res.redirect("/listings");
  })
  }catch(err){
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

module.exports.login = (req,res) => {
  res.render("./users/login.ejs");
};

module.exports.loginUser = async(req,res) => {
  req.flash("success","Welcome to StayNest, You logged in successfully");
  let redirectUrl = res.locals.redirectUrl || "/listings"
  res.redirect(redirectUrl);
};

module.exports.logoutUser = (req,res, next) => {
  req.logout((err) => {
    if(err){
      next(err);
    }
    req.flash("success", "You are logged out!!");
    res.redirect("/listings");
  })
};