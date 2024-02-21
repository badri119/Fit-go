require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//getting the signup and saving it to signUpRouter
const signupRouter = require("./routes/signup");
const signinRouter = require("./routes/signin");
const users = require("./routes/users");

// Mount the signup router
app.use("/signup", signupRouter);
app.use("/signin", signinRouter);
app.use("/users", users);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

// app.get("/", (req, res) => {
//   res.send("<h1>Hello</h1>");
// });
