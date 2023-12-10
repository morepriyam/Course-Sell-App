// Import necessary modules and libraries
const { User, Course, Admin } = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const secret_key = auth.secret_key;

// Controller for user signup
const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      email: email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: result.email, role: "user" }, secret_key, {
      expiresIn: "1h",
    });
    res.status(200).json({ user: result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Controller for user signin
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { email: existingUser.email, role: "user" },
      secret_key,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ user: existingUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//Courses
const getCourses = async (req, res) => {
  const courses = await Course.find({ published: true });
  res.json({ courses });
};

const purchaseCourse = async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  console.log(course);
  if (course) {
    const user = await User.findOne({ email: req.user.email });
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: "Course purchased successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};

const purchased = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
};

// Controller to fetch user details
const me = async (req, res) => {
  const user = req.user;
  res.status(200).json({ email: user.email });
};

// Export all the controllers and middleware
module.exports = {
  signup,
  signin,
  me,
  getCourses,
  purchaseCourse,
  purchased,
};
