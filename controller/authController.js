const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const RegisterUser = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Email, name, and password required" });
  }

  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate) return res.status(409).json({ message: "Duplicate email." });

  try {
    const hashedPwd = await bcrypt.hash(password, 10); // 10 is the salt round
    const result = await User.create({ email: email, password: hashedPwd, name: name });

    console.log(result);
    res.status(201).json({ success: `New user with email ${email} created.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required." });
  }

  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) return res.status(403).json({ message: "Unauthorized" });

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.status(403).json({ message: "Unauthorized" });

  let token
  token = jwt.sign(
    {
      email: foundUser.email,
      role: foundUser.role,
    },
    process.env.SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({
    token: token
  })
}

module.exports = {
  RegisterUser,
  LoginUser,
};