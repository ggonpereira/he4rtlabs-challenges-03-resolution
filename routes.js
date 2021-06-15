const express = require("express");
const router = express.Router();
const pagesController = require("./src/controllers/pagesController");
const userController = require("./src/controllers/userController");
const verifySession = require("./src/middlewares/verifySession");

// Pages routes
router.get("/", pagesController.homePage);
router.get("/logged", verifySession, pagesController.dashboardPage);

// User routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

module.exports = router;
