const { User, Course, Admin } = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const secret_key = auth.secret_key;

const me = async (req, res) => {
  const admin = await Admin.findOne({ email: req.user.email });
  if (!admin) {
    res.status(403).json({ msg: "Admin doesnt exist" });
    return;
  }
  res.json({
    email: admin.email,
  });
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email: email });
    if (existingAdmin) {
      return res.status(400).json({ message: "admin already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await Admin.create({
      email: email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email, role: "admin" }, secret_key, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Admin created successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email: email });
    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin Not Found" });
    }
    const matchPassword = await bcrypt.compare(
      password,
      existingAdmin.password
    );
    if (!matchPassword) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ email: email, role: "admin" }, secret_key, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const addCourse = async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course created successfully", courseId: course.id });
};

const updateCourse_id = async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true,
  });
  if (course) {
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};

const getCourses = async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
};

const getCourse_id = async (req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  res.json({ course });
};

// Export all the controllers and middleware
module.exports = {
  signup,
  signin,
  me,
  getCourses,
  getCourse_id,
  addCourse,
  updateCourse_id,
};
