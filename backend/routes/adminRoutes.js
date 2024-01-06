// Import the Express library
const express = require("express");

// Import the necessary controllers and middleware from the adminController
const {
  signup,
  signin,
  me,
  getCourses,
  updateCourse_id,
  addCourse,
  getCourse_id,
} = require("../controllers/adminController");

//Auth
const auth = require("../middleware/auth");
const { inputValidation } = require("../middleware/inputValid");
const authenticateJwt = auth.authenticateJwt;

// Create an instance of the Express Router
const adminRouter = express.Router();

// Define routes and associate them with the corresponding controllers/middleware

// Route for admin signup
adminRouter.post("/signup", inputValidation, signup);

// Route for admin signin
adminRouter.post("/signin", signin);

// Route for fetching admin details (requires authentication)
adminRouter.get("/me", authenticateJwt, me);

//Courses
adminRouter.post("/courses", authenticateJwt, addCourse);
adminRouter.put("/courses/:courseId", authenticateJwt, updateCourse_id);
adminRouter.get("/courses", authenticateJwt, getCourses);
adminRouter.get("/courses/:courseId", authenticateJwt, getCourse_id);

// Export the adminRouter to be used in the main application
module.exports = adminRouter;
