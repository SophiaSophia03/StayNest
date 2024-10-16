const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");

// Index route
router.get("/", wrapAsync(listingController.index));

//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm );

//Create Route
router.post(
  "/",isLoggedIn,validateListing,
  wrapAsync(listingController.createListing)
);

//Show Route
router.get("/:id", wrapAsync(listingController.showListing));

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.editListing));

//Update Route
router.put("/:id",isLoggedIn,isOwner, validateListing, wrapAsync(listingController.updateListing));

// Delete Route
router.delete("/:id",isLoggedIn, isOwner,wrapAsync(listingController.deleteListing));

module.exports = router;
