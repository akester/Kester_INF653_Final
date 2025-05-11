const User = require('../models/user');
const bcrypt = require('bcrypt');

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

module.exports = {
  RegisterUser
};