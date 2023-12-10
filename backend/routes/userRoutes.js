// Import the Express library
const express = require("express");

// Import the necessary controllers and middleware from the userController
const {
  signup,
  signin,
  me,
  getCourses,
  purchaseCourse,
  purchased,
} = require("../controllers/userController");

//Auth
const auth = require("../middleware/auth");
const authenticateJwt = auth.authenticateJwt;

// Create an instance of the Express Router
const userRouter = express.Router();

// Define routes and associate them with the corresponding controllers/middleware

// Route for user signup
userRouter.post("/signup", signup);

// Route for user signin
userRouter.post("/signin", signin);

// Route for fetching user details (requires authentication)
userRouter.get("/me", authenticateJwt, me);

//Courses
userRouter.post("/courses/:courseId", authenticateJwt, purchaseCourse);
userRouter.get("/courses", authenticateJwt, getCourses);
userRouter.get("/purchasedCourses", authenticateJwt, purchased);

// Export the userRouter to be used in the main application
module.exports = userRouter;
