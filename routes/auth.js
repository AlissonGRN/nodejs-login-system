require("dotenv").config();

const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { registerValidation, loginValidation } = require("../validation");

// Validate and register new user in database
router.post("/register", async (req, res) => {
  // Validate user data before registration
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check email aviability
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).json({ error: "Email already exists" });

  // Hash user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Add user to database
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.json({ message: "user registered", userId: user._id });
  } catch (error) {
    res.status(400).json({ message: "Falied to register user", error: error });
  }
});

module.exports = router;
