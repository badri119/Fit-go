//users
const express = require("express");
const admin = require("firebase-admin");

const router = express.Router();

// Initialize Firestore
const db = admin.firestore();

router.get("/", async (req, res) => {
  try {
    const users = await db.collection("users").get();
    const allUsers = [];
    users.forEach((doc) => {
      allUsers.push(doc.data());
    });

    res.json({ allUsers });
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ message: "Error getting users" });
  }
});

module.exports = router;
