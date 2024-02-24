const express = require("express");
const admin = require("firebase-admin");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Initialize Firestore
const db = admin.firestore();
//Initializing Firestore which has more options
const timestamp = admin.firestore.FieldValue.serverTimestamp();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Convert email to lowercase
    const lowercaseEmail = email.toLowerCase();

    // Check if email already exists
    const existingEmail = await db
      .collection("users")
      .where("email", "==", lowercaseEmail)
      .get();

    //Other way to do it:
    // const existingEmail = await db.collection("users").get();
    // const userData = existingEmail.docs[0].data();
    // const email2 = userData.email;
    //if(lowercaseemail === email2){
    //   return res.status(400).json({ message: "Email already exists" });
    // }

    if (!existingEmail.empty) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user data to Firestore
    const userRef = await db.collection("users").add({
      Email: lowercaseEmail,
      Password: hashedPassword,
      Timestamp: timestamp,
      FirstTimeUser: true,
    });

    //Getting the ID from firestore DB, as firebase creates a unique ID and pushing it inside the user ID data
    const userId = userRef.id;
    // console.log(userId);

    await userRef.update({
      id: userId,
    });

    res.status(200).json({
      message: "User signed up successfully",
    });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).send("Error signing up");
  }
});

module.exports = router;
