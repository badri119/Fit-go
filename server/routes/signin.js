// signin.js
const express = require("express");
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Initialize Firestore
const db = admin.firestore();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Convert email to lowercase
    const lowercaseEmail = email.toLowerCase();

    // Check if user exists with the given email
    const existingEmail = await db
      .collection("users")
      .where("Email", "==", lowercaseEmail)
      .limit(1)
      .get();

    if (existingEmail.empty) {
      return res.status(404).json({ message: "User not found" });
    }

    // Retrieve user data
    const userData = existingEmail.docs[0].data();

    // Verify password
    const passwordMatch = await bcrypt.compare(password, userData.Password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    //Checking if the user is signing in for the first time
    const firstTimeUser = userData.FirstTimeUser;

    //Getting the ID from the database
    const userId = userData.id;
    // Generate JWT token using the userId
    const token = jwt.sign({ userId }, process.env.TOKEN_SECRET);

    res.status(200).json({
      message: "Sign in successful",
      Token: token,
      UserId: userId,
      FirstTimeUser: firstTimeUser,
    });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ message: "Error signing in" });
  }
});

module.exports = router;
