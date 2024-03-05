# Fit.go:

A web application for exercise enthusiasts to find compatible workout partners, intensifying and enhancing their fitness routines for more enjoyment and effectiveness.

# Motive:

As a cycling enthusiast, I've often considered how some people who want to exercise may not enjoy doing it alone. This web application is losely based on tinder where you match with your workout partner instead of your potential life partner (😆).

## My Longest ride yet:

### Vancouver to Mt. Baker (Washington) and back

![](Ride.jpeg)

# Demo (Coming soon):

# Screenshot:

![Home Page](<Screenshot 2024-02-23 at 18.02.02.png>)

# Technical Details:

- The Application was built using React, Redux, and Firebase
- Utilized Redux to provide global state management
- Employed hashing to encrypt the password and saved it in the database
- Used Axios for API calls
- Implemented cookies to persist user data and pass required variables wherever it's required

# Key Features:

- Implemented Signin and Signup functionality through firestore DB instead of using Google's Authentication
- Credientials are encrypted on a database level
- Users have the option to choose an activity they are interested in
- If there's a match, the user can chat and exchange messages with their workout partner

# Future Improvements:

- Upcoming features will involve more activities to pick from
- A mobile application to follow-up

# API endpoints:

| Endpoint | Method | Description      |
| -------- | ------ | ---------------- |
| /users   | GET    | Get all Users    |
| /signup  | POST   | Sign up new User |
| /signin  | POST   | Signs in a User  |
| /users   | PUT    | Edits a User     |

# How to start the project:

1. Clone the project and open it using Visual studio code or any desired IDE.
2. A firebase configuration will be required, please head to https://firebase.google.com/ and create a project
3. After creating a project, initialize hosting
4. Create a Firestore Database and Storage

# Frontend

1. cd to frontend and install the required dependencies using "npm install"
2. After setting up firebase, you will need to copy the values from project settings and create a new file and paste it their, (firebase.js for reference)
3. In your firebase.js file, make sure you have your appspot in the storage variable
4. In the terminal, type npm start to start the project.

# Backend

1. cd to backend and install the required dependencies using npm install
2. Firebase Admin Setup:
   - Initialize a Service Account via firebase (Project Overview > Project Settings > Service Accounts) and generate a serviceAccountKey using node.js
   - save the serviceAccountKey to a json file
   - After saving, in your app.js, import the serviceAccountKey file and save it to a variable
   - Initialize the serviceAccountKey.
     - Example: admin.initializeApp({
       credential: admin.credential.cert("variable you saved it to")
       });
3. Run npm start for the server to boot up
