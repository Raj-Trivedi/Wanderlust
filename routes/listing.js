const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner , validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.get("/filter/:id", wrapAsync(listingController.filter)); //Filter Route

router.get("/search", wrapAsync(listingController.search)); //Search Route

router.route("/")
        .get(wrapAsync(listingController.index))   //Index Route
        .post(isLoggedIn, upload.single("listing[image]"),validateListing, wrapAsync(listingController.createListing));  //Create Route

router.get("/new" , isLoggedIn, listingController.renderNewForm);   //New Route

router.route("/:id")
        .get(wrapAsync(listingController.showListing))  //Show Route
        .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))   //Update Route
        .delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));   //Delete Route

router.get("/:id/edit" ,isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));  //Edit Route
       
module.exports = router;





//Another way to write callbacks
// Index Route
// router.get("/", wrapAsync(listingController.index));

// New Route
// router.get("/new" , isLoggedIn, listingController.renderNewForm);

// Show Route
// router.get("/:id" , wrapAsync(listingController.showListing));

// Create Route
// router.post("/" ,isLoggedIn, validateListing, wrapAsync(listingController.createListing));

// Edit Route 
// router.get("/:id/edit" ,isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

// Update Route
// router.put("/:id" ,isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

// Delete Route
// router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));


