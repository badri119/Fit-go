//users
const express = require("express");
const admin = require("firebase-admin");

const router = express.Router();

// Initialize Firestore
const db = admin.firestore();

//Get all users
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

//Update specific user
router.put("/", async (req, res) => {
  try {
    //request to get formData
    const formData = req.body.formData;

    //getting the user_id from the form data
    const userIdcompare = formData.user_id;
    // console.log(
    //   "Directly from DB and through variable",
    //   formData.user_id,
    //   userIdcompare
    // );

    //checking to see if the user_id exists in the DB
    const user = await db
      .collection("users")
      .where("id", "==", userIdcompare)
      .limit(1)
      .get();

    // If it's not there, return user not found
    if (user.empty) {
      return res.status(404).json({ message: "User not found" });
    }

    //Get the userDoc
    const userDoc = user.docs[0];

    //update the specific userDoc
    await userDoc.ref.update({
      name: formData.name,
      age: formData.age,
      gender: formData.gender_identity,
      interest: formData.sport_interest,
      about: formData.about,
      matches: formData.matches,
      firstTimeUser: false,
    });

    //fetching updated data:
    const updatedUser = await userDoc.ref.get();

    res.status(200).json({
      message: "User updated successfully",
      updatedUser: updatedUser.data(),
    });
  } catch (error) {
    console.error("Error in registering", error);
    res.status(500).send("Error in registering");
  }
});

module.exports = router;
